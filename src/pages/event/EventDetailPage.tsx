import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventsApi from "@/api/eventsApi";
import type { EventDto } from "@/dtos/Events/EventDto";
import { BaseEventPage } from "@/components/Event/BaseEventPage";
import { MainLayout } from "@/components/Layouts/MainLayout/MainLayout";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when component mounts or when id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await eventsApi.getEvent(id);
        setEvent(data);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-black">
        {loading && (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-ieee-blue" />
          </div>
        )}
        {error && !loading && (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto p-8 text-red-400 bg-red-900/30 border-2 border-red-500 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Error Loading Event</h2>
              <p className="text-lg">{error}</p>
            </div>
          </div>
        )}
        {!loading && !error && event && <BaseEventPage event={event} />}
      </div>
    </MainLayout>
  );
}
