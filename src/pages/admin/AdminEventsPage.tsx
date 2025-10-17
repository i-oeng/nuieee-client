import { useEffect, useState } from "react";
import AdminHeader from "@/components/Layouts/AdminPageLayout/AdminHeader";
import eventsApi from "@/api/eventsApi";
import type { EventDto } from "@/dtos/Events/EventDto";
import { EventListItem } from "@/components/AdminEvents/EventListItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Simple auth guard inline (later extract)
const useRequireAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
    }
  }, []);
};

export default function AdminEventsPage() {
  useRequireAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getEvents();
      // sort descending by date (earliest first means upcoming soonest?) We'll assume ascending chronological
      const sorted = [...data].sort(
        (a, b) => new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime()
      );
      setEvents(sorted);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = (id: string) => {
    // open confirmation
    setConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!confirmId) return;
    try {
      setDeletingId(confirmId);
      await eventsApi.deleteEvent(confirmId);
      toast.success("Event deleted");
      setEvents(evts => evts.filter(e => e.id !== confirmId));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AdminHeader />
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
          <div>
            <h1 className="text-[clamp(60px,8vw,100px)] font-inter font-extrabold text-ieee-blue lowercase leading-none">
              events
            </h1>
            <p className="text-white text-[clamp(16px,2vw,24px)] font-inter font-semibold mt-4">
              Manage NU IEEE events and activities
            </p>
          </div>
          <Button 
            onClick={() => navigate("/admin/events/addNewEvent")}
            className="bg-ieee-blue hover:bg-ieee-blue/90 text-white font-semibold text-lg px-8 py-6 h-auto rounded-md uppercase"
          >
            Add New Event
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-ieee-blue" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 p-6 rounded-md mb-8">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed border-ieee-blue/30 rounded-lg bg-black">
            <p className="text-white text-2xl font-inter font-bold mb-6">No events yet.</p>
            <Button 
              onClick={() => navigate("/admin/events/addNewEvent")}
              className="bg-ieee-blue hover:bg-ieee-blue/90 text-white font-semibold px-6 py-3"
            >
              Create your first event
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {events.map(ev => (
            <EventListItem
              key={ev.id}
              event={ev}
              onDelete={handleDelete}
              deleting={deletingId === ev.id}
            />
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-black border-2 border-ieee-blue rounded-lg shadow-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-ieee-blue mb-4 uppercase">Delete Event</h2>
            <p className="text-white text-lg mb-8">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => setConfirmId(null)} 
                disabled={!!deletingId}
                className="border-white text-black"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDelete} 
                disabled={!!deletingId}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}