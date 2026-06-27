import StudentHeader from '../components/student/StudentHeader';
import FeesDashboard from '../components/student/FeesDashboard';
import FeePaySection from '../components/student/FeePaySection';
import StudentFooter from '../components/student/StudentFooter';

export default function StudentFees() {
  const student = {
    name: 'Arjun Sharma',
    belt: 'Orange Belt',
    beltColor: '#FF8C00',
    daysPresent: 42,
    totalDays: 60,
    quizPoints: 780,
    rank: 3,
  };

  return (
    <div className="min-h-screen bg-brand-white">
      <StudentHeader student={student} />
      <main className="pt-[70px]">
        <FeesDashboard student={student} />
        <FeePaySection />
      </main>
      <StudentFooter />
    </div>
  );
}
