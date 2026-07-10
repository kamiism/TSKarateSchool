import StudentHeader from '../components/student/StudentHeader';
import Dashboard from '../components/student/Dashboard';
import Leaderboard from '../components/student/Leaderboard';
import Syllabus from '../components/student/Syllabus';
import KataVideo from '../components/student/KataVideo';
import NewsEvents from '../components/student/NewsEvents';
import StudentFooter from '../components/student/StudentFooter';
import { useAuth } from '../context/AuthContext';

export default function StudentHome() {
  const { user } = useAuth();
  const student = {
    name: `${user.firstName} ${user.middleName} ${user.lastName}`,
    belt: `${user.belt ? `${user.belt} Belt` : ""}`,
    beltColor: '#FF8C00',
    daysPresent: 42,
    totalDays: 60,
    quizPoints: Number(user.points),
    rank: 3,
  };

  return (
    <div className="min-h-screen bg-brand-white">
      <StudentHeader student={student} />
      <main className="pt-[70px]">
        <Dashboard student={student} />
        <Leaderboard currentStudentRank={student.rank} />
        <Syllabus currentBelt={student.belt} />
        <KataVideo />
        <NewsEvents />
      </main>
      <StudentFooter />
    </div>
  );
}
