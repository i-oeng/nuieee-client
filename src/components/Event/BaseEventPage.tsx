import type { EventDto } from "@/dtos/Events/EventDto";
const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};
import ieeeSmallBlueIcon from "@/assets/icons/ieee_small_blue_icon.svg";
import { Button } from "@/components/ui/button";

interface Props {
  event: EventDto;
}

export const BaseEventPage: React.FC<Props> = ({ event }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <img src={ieeeSmallBlueIcon} alt="IEEE" className="w-16 h-16" />
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {event.title || "Untitled Event"}
          </h1>
          <p className="text-gray-600 text-sm">{formatDateTime(event.eventDateTime)}</p>
        </div>
      </div>
      {event.registrationLink && (
        <div className="mb-6">
          <Button asChild>
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </a>
          </Button>
        </div>
      )}
      <article className="prose max-w-none mb-10">
        <p>{event.description}</p>
      </article>
      {event.photos && event.photos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {event.photos.map(p => (
              <figure
                key={p.id}
                className="bg-gray-50 rounded-md overflow-hidden border border-gray-200"
              >
                {p.photoLink && (
                  <img
                    src={p.photoLink}
                    alt={p.alternativeText || "Event photo"}
                    className="w-full h-48 object-cover"
                  />
                )}
                {p.alternativeText && (
                  <figcaption className="text-xs text-gray-600 p-2">
                    {p.alternativeText}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
