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
      <div className="min-h-screen bg-white">
        {loading && (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        )}
        {error && !loading && (
          <div className="max-w-xl mx-auto p-6 text-red-600 bg-red-50 rounded-md mt-10">
            {error}
          </div>
        )}
        {!loading && !error && event && <BaseEventPage event={event} />}
      </div>
    </MainLayout>
  );
}
