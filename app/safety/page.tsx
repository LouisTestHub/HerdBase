import { redirect } from 'next/navigation';

export default function SafetyPage() {
  // Health & Safety module is coming soon - redirect to main dashboard
  redirect('/dashboard');
}
