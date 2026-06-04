import StudentHeader from '../components/student/StudentHeader';
import Dashboard from '../components/student/Dashboard';
import Leaderboard from '../components/student/Leaderboard';
import Syllabus from '../components/student/Syllabus';
import KataVideo from '../components/student/KataVideo';
import NewsEvents from '../components/student/NewsEvents';
import StudentFooter from '../components/student/StudentFooter';

export default function StudentHome() {
  // Placeholder student data — will be replaced with real data later
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
