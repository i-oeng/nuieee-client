import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminHeader from "@/components/Layouts/AdminPageLayout/AdminHeader";
import { Button } from "@/components/ui/button";
import eventsApi from "@/api/eventsApi";
import type { CreateEventCommand } from "@/dtos/Events/EventDto";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(2, "Title too short").max(200),
  description: z.string().min(10, "Description too short").max(5000),
  eventDateTime: z.string(), // we'll ensure it's valid before submit
  registrationLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  photos: z
    .array(
      z.object({
        alternativeText: z.string().optional(),
        photoLink: z.string().url("Invalid photo URL").optional(),
      })
    )
    .optional(),
});

export default function AddNewEventPage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      eventDateTime: "",
      registrationLink: "",
      photos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "photos",
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      if (!values.eventDateTime) {
        toast.error("Event date/time required");
        return;
      }
      const payload: CreateEventCommand = {
        title: values.title,
        description: values.description,
        eventDateTime: new Date(values.eventDateTime).toISOString(),
        registrationLink: values.registrationLink || undefined,
        photos: values.photos?.map(p => ({
          alternativeText: p.alternativeText,
          photoLink: p.photoLink,
        })),
      };
      const created = await eventsApi.createEvent(payload);
      toast.success("Event created");
      navigate(`/events/${created.id}`);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add New Event</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white rounded-lg shadow p-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              {...form.register("title")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Amazing Engineering Talk"
            />
            {form.formState.errors.title && (
              <p className="text-xs text-red-600 mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* DateTime */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date & Time
              </label>
              <input
                type="datetime-local"
                {...form.register("eventDateTime")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {form.formState.errors.eventDateTime && (
                <p className="text-xs text-red-600 mt-1">
                  {form.formState.errors.eventDateTime.message}
                </p>
              )}
            </div>

          {/* Registration Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Link (optional)
            </label>
            <input
              type="url"
              {...form.register("registrationLink")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://"
            />
            {form.formState.errors.registrationLink && (
              <p className="text-xs text-red-600 mt-1">
                {form.formState.errors.registrationLink.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={6}
              {...form.register("description")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the event..."
            />
            {form.formState.errors.description && (
              <p className="text-xs text-red-600 mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Photos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Photos (URL uploads placeholder)
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ alternativeText: "", photoLink: "" })}
              >
                Add Photo
              </Button>
            </div>
            <div className="space-y-4">
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="border rounded-md p-3 bg-gray-50 space-y-2"
                >
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="url"
                        placeholder="Photo URL (uploaded blob)"
                        {...form.register(`photos.${idx}.photoLink` as const)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Alternative text"
                        {...form.register(`photos.${idx}.alternativeText` as const)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      type="button"
                      onClick={() => remove(idx)}
                    >
                      X
                    </Button>
                  </div>
                  {form.formState.errors.photos?.[idx]?.photoLink && (
                    <p className="text-xs text-red-600">
                      {form.formState.errors.photos[idx]?.photoLink?.message}
                    </p>
                  )}
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-xs text-gray-500">No photos added yet.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/events")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
