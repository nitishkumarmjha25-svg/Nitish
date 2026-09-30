import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  QrCode,
  X,
} from 'lucide-react';

export interface DemoStep {
  stepNumber: number;
  title: string;
  description: string;
  actionLabel: string;
}

export const DEMO_TOUR_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Welcome to Village Harvest’s Brand Studio',
    description:
      'You are viewing the Seller Dashboard for “Village Harvest”, a 18-member women’s food collective in Ratnagiri. Review live QR scan metrics, customer ratings, and document statuses.',
    actionLabel: 'Next: Inspect “Homemade Mango Pickle”',
  },
  {
    stepNumber: 2,
    title: 'Product Catalog & Batch Management',
    description:
      'Here in My Products, inspect “Homemade Mango Pickle” (Batch #VH-MP-2609). Every product stores its exact ingredients, manufacturing/expiry dates, and generates a unique QR code.',
    actionLabel: 'Next: Open Public QR Trust Profile',
  },
  {
    stepNumber: 3,
    title: 'Consumer-Facing QR Product Trust Page',
    description:
      'When a shopper scans the QR code on the jar, this mobile-friendly page opens. Notice the Trust Status Card, honest authenticity distinction, quality document records, and buyer reviews.',
    actionLabel: 'Next: Return & Open Brand Studio',
  },
  {
    stepNumber: 4,
    title: 'Interactive Brand Studio (Mini-Canva for Sellers)',
    description:
      'Back in the Seller Dashboard, Brand Studio lets Village Harvest customize logos, jar labels, neck seals, and social posters with embedded QR codes—and download them as PNG or PDF.',
    actionLabel: 'Next: Inspect Admin Verification Queue',
  },
  {
    stepNumber: 5,
    title: 'Admin Document Verification Governance',
    description:
      'Only platform administrators can verify uploaded FSSAI or lab records. Try clicking “Verify Document” on a pending record here to see it immediately update on the public QR page and backend!',
    actionLabel: 'Finish Tour & Explore Freely',
  },
];

interface DemoTourBarProps {
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onCloseTour: () => void;
  onQuickOpenPickleQR: () => void;
}

export const DemoTourBar: React.FC<DemoTourBarProps> = ({
  currentStepIndex,
  onSelectStep,
  onNextStep,
  onPrevStep,
  onCloseTour,
  onQuickOpenPickleQR,
}) => {
  const step = DEMO_TOUR_STEPS[currentStepIndex] || DEMO_TOUR_STEPS[0];

  return (
    <div className="fixed bottom-4 inset-x-4 z-50 pointer-events-none flex justify-center">
      <div className="pointer-events-auto w-full max-w-4xl bg-stone-950/95 backdrop-blur-md text-stone-100 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-400">
                <Compass className="w-3.5 h-3.5" />
                <span>
                  PRESENTATION MODE · STEP {step.stepNumber} OF {DEMO_TOUR_STEPS.length}
                </span>
              </span>
              <span className="text-stone-500">·</span>
              <span className="font-semibold text-white">{step.title}</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">{step.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onQuickOpenPickleQR}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-300 hover:text-white bg-emerald-950/80 border border-emerald-700/60 rounded-lg transition-colors whitespace-nowrap"
              title="Jump directly to Homemade Mango Pickle QR Page"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Mango Pickle QR</span>
            </button>

            <div className="flex items-center gap-1 px-1">
              {DEMO_TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  onClick={() => onSelectStep(idx)}
                  className={`w-6 h-6 rounded-md text-[11px] font-mono font-bold transition-colors ${
                    idx === currentStepIndex
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  {s.stepNumber}
                </button>
              ))}
            </div>

            {currentStepIndex > 0 && (
              <button
                onClick={onPrevStep}
                className="p-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
                title="Previous Step"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onNextStep}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap"
            >
              <span>{step.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onCloseTour}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
              title="Exit Guided Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
