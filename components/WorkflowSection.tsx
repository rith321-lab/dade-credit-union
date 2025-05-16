import React from 'react';
import WorkflowCard from './WorkflowCard';
import { 
  Home, 
  GraduationCap, 
  CreditCard, 
  BarChart3, 
  Car, 
  Users, 
  Target 
} from 'lucide-react';

const workflows = [
  {
    icon: Home,
    title: 'HELOC Made Simple',
    shortDescription: "Access your home's equity with our streamlined application process",
    longDescription: 'Our Home Equity Line of Credit offers competitive rates and a quick approval process, designed to help you achieve your financial goals.',
    buttonText: 'Learn More',
    buttonHref: '/heloc',
  },
  {
    icon: Car,
    title: 'Auto Loan',
    shortDescription: 'Finance your next vehicle with competitive rates and flexible terms',
    longDescription: 'With our auto loans, you can drive away in your dream car with rates that will not break the bank.',
    buttonText: 'Apply Now',
    buttonHref: '/auto-loan',
  },
  {
    icon: CreditCard,
    title: 'Credit Cards',
    shortDescription: 'Find the perfect card to match your lifestyle and spending habits',
    longDescription: 'Compare our credit card options with competitive rates, rewards, and benefits tailored to your needs.',
    buttonText: 'Compare Cards',
    buttonHref: '/credit-card',
  },
  {
    icon: BarChart3,
    title: 'Financial Dashboard',
    shortDescription: 'Track your finances with our comprehensive dashboard',
    longDescription: 'Get a complete view of your accounts, transactions, spending habits, and financial health in one place.',
    buttonText: 'View Dashboard',
    buttonHref: '/dashboard',
  },
  {
    icon: Target,
    title: 'Financial Goals',
    shortDescription: 'Set, track, and achieve your financial goals',
    longDescription: 'Create personalized financial goals with automatic tracking and recommendations to help you succeed.',
    buttonText: 'Set Goals',
    buttonHref: '/goals',
  },
  {
    icon: Users,
    title: 'Join Today',
    shortDescription: 'Become a member of Dade County Federal Credit Union',
    longDescription: 'Join our community and enjoy better rates, lower fees, and personalized service designed with your needs in mind.',
    buttonText: 'Join Now',
    buttonHref: '/join',
  },
];

const WorkflowSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore our financial services designed to help you achieve your goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflows.map((workflow, index) => (
            <WorkflowCard
              key={index}
              icon={workflow.icon}
              title={workflow.title}
              shortDescription={workflow.shortDescription}
              longDescription={workflow.longDescription}
              buttonText={workflow.buttonText}
              buttonHref={workflow.buttonHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection; 