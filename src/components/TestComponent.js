// Test file for React Query hooks
import { useClasses, useCreateClass } from './queryHooks';

// Test component to verify React Query hooks
function TestComponent() {
  const { data: classes, isLoading, error } = useClasses();
  const createClassMutation = useCreateClass();
  
  const handleCreateClass = async () => {
    try {
      await createClassMutation.mutateAsync({
        code: 'TEST202',
        name: 'React Query Test Class',
        instructor: 'Test Instructor',
        students: 0
      });
      console.log('Class created successfully');
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Test Component</h1>
      <button onClick={handleCreateClass}>Create Test Class</button>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>{cls.name} ({cls.code})</li>
        ))}
      </ul>
    </div>
  );
}

export default TestComponent;