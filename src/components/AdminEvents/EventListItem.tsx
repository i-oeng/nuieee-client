import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import type { EventDto } from "@/dtos/Events/EventDto";
// Lightweight date formatting (avoid extra dependency)
const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

interface Props {
  event: EventDto;
  onDelete: (id: string) => void;
  deleting?: boolean;
}

export const EventListItem: React.FC<Props> = ({ event, onDelete, deleting }) => {
  const navigate = useNavigate();

  const handleOpen = () => navigate(`/events/${event.id}`);
  const handleDelete = () => onDelete(event.id);

  return (
    <div className="group rounded-lg border border-gray-200 bg-white p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {event.title || "Untitled Event"}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{formatDateTime(event.eventDateTime)}</p>
        {event.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {event.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 md:flex-col md:gap-3">
        <Button variant="outline" size="sm" onClick={handleOpen}>
          View
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};
