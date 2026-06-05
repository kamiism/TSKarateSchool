import StudentHeader from '../components/student/StudentHeader';
import QuizSection from '../components/student/QuizSection';
import StudentFooter from '../components/student/StudentFooter';

// Placeholder student data (in a real app, this would come from auth context/API)
const currentStudent = {
  name: 'Priya Patel',
  belt: 'Green Belt',
  beltColor: '#228B22',
  daysPresent: 58,
  totalDays: 60,
  quizPoints: 950,
  rank: 1,
};

export default function QuizPage() {
  return (
    <div className="bg-brand-black min-h-screen">
      <StudentHeader student={currentStudent} />
      <main className="pt-[70px] bg-brand-white min-h-[80vh]">
        <QuizSection />
      </main>
      <StudentFooter />
    </div>
  );
}
