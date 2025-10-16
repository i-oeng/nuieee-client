export interface EventPhotoDto {
  id: string;
  alternativeText?: string | null;
  photoLink?: string | null; // absolute URL to blob/image
}

export interface EventDto {
  id: string;
  title?: string | null;
  description?: string | null;
  eventDateTime: string; // ISO date-time from backend
  hasRegistrationLink: boolean;
  registrationLink?: string | null;
  photos?: EventPhotoDto[] | null;
}

export interface CreateEventPhotoInput {
  alternativeText?: string | null;
  photoLink?: string | null;
}

export interface CreateEventCommand {
  title?: string | null;
  description?: string | null;
  eventDateTime: string; // to ISO string before sending
  registrationLink?: string | null;
  photos?: CreateEventPhotoInput[] | null;
}

export interface UpdateEventCommand {
  eventDto: EventDto;
}
