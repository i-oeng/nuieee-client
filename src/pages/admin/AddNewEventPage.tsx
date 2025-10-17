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
    <div className="min-h-screen bg-black">
      <AdminHeader />
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <h1 className="text-[clamp(60px,8vw,100px)] font-inter font-extrabold text-ieee-blue lowercase leading-none mb-12">
          add new event
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-4xl space-y-8 bg-black border-2 border-white rounded-lg shadow-2xl p-8 md:p-12"
        >
          {/* Title */}
          <div>
            <label className="block text-white text-xl font-inter font-semibold mb-3 uppercase">
              Title
            </label>
            <input
              type="text"
              {...form.register("title")}
              className="w-full rounded-md border-2 border-white bg-black text-white px-4 py-3 text-lg font-inter focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue placeholder-white/50"
              placeholder="Amazing Engineering Talk"
            />
            {form.formState.errors.title && (
              <p className="text-red-400 text-sm mt-2 font-semibold">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* DateTime */}
          <div>
            <label className="block text-white text-xl font-inter font-semibold mb-3 uppercase">
              Event Date & Time
            </label>
            <input
              type="datetime-local"
              {...form.register("eventDateTime")}
              className="w-full rounded-md border-2 border-white bg-black text-white px-4 py-3 text-lg font-inter focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue"
            />
            {form.formState.errors.eventDateTime && (
              <p className="text-red-400 text-sm mt-2 font-semibold">
                {form.formState.errors.eventDateTime.message}
              </p>
            )}
          </div>

          {/* Registration Link */}
          <div>
            <label className="block text-white text-xl font-inter font-semibold mb-3 uppercase">
              Registration Link (optional)
            </label>
            <input
              type="url"
              {...form.register("registrationLink")}
              className="w-full rounded-md border-2 border-white bg-black text-white px-4 py-3 text-lg font-inter focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue placeholder-white/50"
              placeholder="https://"
            />
            {form.formState.errors.registrationLink && (
              <p className="text-red-400 text-sm mt-2 font-semibold">
                {form.formState.errors.registrationLink.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white text-xl font-inter font-semibold mb-3 uppercase">
              Description
            </label>
            <textarea
              rows={6}
              {...form.register("description")}
              className="w-full rounded-md border-2 border-white bg-black text-white px-4 py-3 text-lg font-inter focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue placeholder-white/50"
              placeholder="Describe the event..."
            />
            {form.formState.errors.description && (
              <p className="text-red-400 text-sm mt-2 font-semibold">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Photos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-white text-xl font-inter font-semibold uppercase">
                Photos (URL uploads)
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ alternativeText: "", photoLink: "" })}
                className="border-ieee-blue text-ieee-blue hover:bg-ieee-blue hover:text-white font-semibold uppercase"
              >
                Add Photo
              </Button>
            </div>
            <div className="space-y-4">
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="border-2 border-white/30 rounded-md p-4 bg-black/50 space-y-3"
                >
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="url"
                        placeholder="Photo URL (uploaded blob)"
                        {...form.register(`photos.${idx}.photoLink` as const)}
                        className="w-full rounded-md border border-white/50 bg-black text-white px-3 py-2 text-base font-inter focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue placeholder-white/40"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Alternative text"
                        {...form.register(`photos.${idx}.alternativeText` as const)}
                        className="w-full rounded-md border border-white/50 bg-black text-white px-3 py-2 text-base font-inter focus:ring-2 focus:ring-ieee-blue focus:border-ieee-blue placeholder-white/40"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => remove(idx)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4"
                    >
                      ✕
                    </Button>
                  </div>
                  {form.formState.errors.photos?.[idx]?.photoLink && (
                    <p className="text-red-400 text-sm font-semibold">
                      {form.formState.errors.photos[idx]?.photoLink?.message}
                    </p>
                  )}
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-white/60 text-base italic">No photos added yet.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/events")}
              className="border-white text-white hover:bg-white/10 font-semibold uppercase text-lg px-8 py-3"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              className="bg-ieee-blue hover:bg-ieee-blue/90 text-white font-semibold uppercase text-lg px-8 py-3"
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
