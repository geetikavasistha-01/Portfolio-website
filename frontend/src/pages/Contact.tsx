import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { Send, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.')
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const sendMutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const res = await api.post('/contact', values);
      return res.data;
    },
    onSuccess: () => {
      alert('Message sent successfully!');
      reset();
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to send message.');
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    sendMutation.mutate(data);
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>CONTACT</span>
          <span>open path</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          Get in touch.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          Questions about projects, collaboration offers, or just saying hello. Send a direct ping.
        </p>
      </div>

      <SectionHeader label="contact form" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5 mt-2 select-none"
      >
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1">
            Name
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder="Your Name"
            className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text2 placeholder-text4 outline-none focus:border-text3 transition-colors"
          />
          {errors.name && (
            <span className="text-[10px] text-rose mt-1 font-mono">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text2 placeholder-text4 outline-none focus:border-text3 transition-colors"
          />
          {errors.email && (
            <span className="text-[10px] text-rose mt-1 font-mono">{errors.email.message}</span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1">
            Message
          </label>
          <textarea
            {...register('message')}
            rows={5}
            placeholder="Write your note here..."
            className="w-full bg-surface2 border border-border rounded-lg p-3 text-xs text-text2 placeholder-text4 outline-none resize-none focus:border-text3 transition-colors"
          />
          {errors.message && (
            <span className="text-[10px] text-rose mt-1 font-mono">{errors.message.message}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sendMutation.isPending}
          className="inline-flex items-center justify-center gap-2 bg-text1 text-bg rounded-full py-2.5 text-xs font-semibold tracking-wider hover:bg-text2 transition-all disabled:opacity-50 select-none uppercase w-full sm:w-[180px] mt-2 ml-auto"
        >
          {sendMutation.isPending ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Send size={12} />
          )}
          Send Message
        </button>
      </form>
    </PageWrapper>
  );
}
