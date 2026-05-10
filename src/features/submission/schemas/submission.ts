import { z } from 'zod';

export const SubmissionSchema = z.object({
  businessId: z.string().min(1),
  businessName: z.string().min(1),
  sessionId: z.uuid(),
  q1Answer: z.string().min(1),
  q2Answer: z.string().min(1),
  starRating: z.number().int().min(1).max(5),
  edited: z.boolean().nullable(),
  googleRedirectTaken: z.boolean().nullable(),
  completionTime: z.number().int().min(1),
  finalSubmittedText: z.string().nullable(),
});

export type Submission = z.infer<typeof SubmissionSchema>;
