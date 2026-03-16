'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';

interface PlanGateProps {
  children: ReactNode;
  hasAccess: boolean;
  requiredPlan: string;
  featureName: string;
}

export default function PlanGate({ children, hasAccess, requiredPlan, featureName }: PlanGateProps) {
  if (hasAccess) return <>{children}</>;

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none opacity-60">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm text-center border border-emerald-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Upgrade to unlock {featureName}</h3>
          <p className="text-sm text-gray-600 mb-6">
            This feature requires the {requiredPlan} plan or higher.
          </p>
          <Link
            href="/upgrade"
            className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-semibold text-sm"
          >
            View Plans & Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}
