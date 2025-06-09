'use client';

import { Badge } from './badge';

interface BillingToggleProps {
  interval: 'month' | 'year';
  onIntervalChange: (interval: 'month' | 'year') => void;
}

export function BillingToggle({ interval, onIntervalChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span 
        className={`text-sm font-medium transition-colors cursor-pointer ${
          interval === 'month' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onIntervalChange('month')}
      >
        Mensual
      </span>
      
      <button
        onClick={() => onIntervalChange(interval === 'month' ? 'year' : 'month')}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
          interval === 'year' ? 'bg-orange-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            interval === 'year' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      
      <span 
        className={`text-sm font-medium transition-colors cursor-pointer ${
          interval === 'year' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onIntervalChange('year')}
      >
        Anual
      </span>
      
      {interval === 'year' && (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Ahorra 20%
        </Badge>
      )}
    </div>
  );
} 