import { redirect } from 'next/navigation';

export default function DocumentsPage() {
  // Documents library is coming soon - redirect to main dashboard
  redirect('/dashboard');
}
