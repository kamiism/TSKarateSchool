import StudentHeader from '../components/student/StudentHeader';
import QuizSection from '../components/student/QuizSection';
import StudentFooter from '../components/student/StudentFooter';
import { useAuth } from '../context/AuthContext';

export default function QuizPage() {
  const { user } = useAuth()
  const currentStudent = {
    name: `${user.firstName} ${user.middleName} ${user.lastName}`,
    belt: `${user.belt ? `${user.belt} Belt` : ""}`,    beltColor: '#228B22',
    daysPresent: 58,
    totalDays: 60,
    quizPoints: 950,
    rank: 1,
  };
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
