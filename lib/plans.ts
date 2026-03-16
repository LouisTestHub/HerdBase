// Plan definitions and feature gating
export type PlanTier = 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface PlanDefinition {
  name: string;
  price: number; // monthly in GBP, 0 = free
  maxAnimals: number;
  features: string[];
  description: string;
}

export const PLANS: Record<PlanTier, PlanDefinition> = {
  FREE: {
    name: 'Free',
    price: 0,
    maxAnimals: 50,
    description: 'Perfect for small herds and calving records',
    features: [
      'Calving book',
      'Basic herd register (up to 50 animals)',
      'Due date tracking',
      'Calving alerts',
    ],
  },
  STARTER: {
    name: 'Starter',
    price: 29,
    maxAnimals: 200,
    description: 'For growing farms that need more',
    features: [
      'Everything in Free',
      'Up to 200 animals',
      'Health & medicine records',
      'Weight tracking',
      'Basic reports & exports',
      'Email support',
    ],
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 59,
    maxAnimals: 500,
    description: 'Full farm management for serious operations',
    features: [
      'Everything in Starter',
      'Up to 500 animals',
      'Breeding & fertility management',
      'Feed management',
      'Financial records',
      'TB testing & compliance',
      'EID reader integration',
      'Market prices & lot preparation',
      'BCMS reporting',
      'Priority support',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99,
    maxAnimals: 99999,
    description: 'Unlimited scale with premium features',
    features: [
      'Everything in Professional',
      'Unlimited animals',
      'Multi-farm support',
      'Sensor integrations',
      'Custom reports',
      'API access',
      'Dedicated account manager',
      'Phone support',
    ],
  },
};

export type FeatureKey =
  | 'calving'
  | 'herd_basic'
  | 'health'
  | 'weight'
  | 'breeding'
  | 'feed'
  | 'finance'
  | 'tb_testing'
  | 'eid_reader'
  | 'markets'
  | 'exports'
  | 'bcms'
  | 'sensors'
  | 'multi_farm'
  | 'api';

const FEATURE_MIN_PLAN: Record<FeatureKey, PlanTier> = {
  calving: 'FREE',
  herd_basic: 'FREE',
  health: 'STARTER',
  weight: 'STARTER',
  breeding: 'PROFESSIONAL',
  feed: 'PROFESSIONAL',
  finance: 'PROFESSIONAL',
  tb_testing: 'PROFESSIONAL',
  eid_reader: 'PROFESSIONAL',
  markets: 'PROFESSIONAL',
  exports: 'PROFESSIONAL',
  bcms: 'PROFESSIONAL',
  sensors: 'ENTERPRISE',
  multi_farm: 'ENTERPRISE',
  api: 'ENTERPRISE',
};

const PLAN_ORDER: PlanTier[] = ['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'];

export function planIndex(plan: PlanTier): number {
  return PLAN_ORDER.indexOf(plan);
}

export function hasFeature(userPlan: PlanTier, feature: FeatureKey): boolean {
  return planIndex(userPlan) >= planIndex(FEATURE_MIN_PLAN[feature]);
}

export function checkPlanLimit(userPlan: PlanTier, currentCount: number): { allowed: boolean; limit: number; remaining: number } {
  const limit = PLANS[userPlan].maxAnimals;
  return {
    allowed: currentCount < limit,
    limit,
    remaining: Math.max(0, limit - currentCount),
  };
}

export function getMinPlanForFeature(feature: FeatureKey): PlanTier {
  return FEATURE_MIN_PLAN[feature];
}
