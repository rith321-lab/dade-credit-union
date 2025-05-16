import React from 'react';
import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface WorkflowCardProps {
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  longDescription: string;
  buttonText: string;
  buttonHref?: string; // Optional: if the button is a link
  onButtonClick?: () => void; // Optional: if the button has a custom action
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  icon: Icon,
  title,
  shortDescription,
  longDescription,
  buttonText,
  buttonHref,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-start p-6 bg-white rounded-lg border border-gray-200 shadow-md w-full max-w-sm h-full">
      <div className="mb-4 text-blue-600">
        <Icon size={40} strokeWidth={2} />
      </div>
      <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="mb-3 text-sm text-gray-500">
        {shortDescription}
      </p>
      <p className="mb-6 text-sm text-gray-700 flex-grow">
        {longDescription}
      </p>
      {buttonHref ? (
        <Link
          href={buttonHref}
          className="mt-auto inline-flex items-center justify-center rounded-md bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 transition-colors"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      ) : (
        <button
          onClick={onButtonClick}
          className="mt-auto inline-flex items-center justify-center rounded-md bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 transition-colors"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default WorkflowCard; 