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
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 text-sm mt-1">Manage NU IEEE events.</p>
          </div>
          <Button onClick={() => navigate("/admin/events/addNewEvent")}>
            Add New Event
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 text-red-600 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-24 border border-dashed border-gray-300 rounded-lg bg-white">
            <p className="text-gray-700 font-medium mb-2">No events yet.</p>
            <Button variant="outline" onClick={() => navigate("/admin/events/addNewEvent")}>Create your first event</Button>
          </div>
        )}

        <div className="space-y-4">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-2">Delete Event</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmId(null)} disabled={!!deletingId}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={!!deletingId}>
                {deletingId ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}