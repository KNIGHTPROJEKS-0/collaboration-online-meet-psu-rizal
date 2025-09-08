// React Query hooks for data management
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ClassService, 
  MeetingService, 
  AttendanceService, 
  GradeService, 
  FileService 
} from './dataService';

// Class hooks
export function useClasses() {
  return useQuery({
    queryKey: ClassService.getQueryKeys().lists(),
    queryFn: () => ClassService.readAll(),
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => ClassService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ClassService.getQueryKeys().lists() });
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ClassService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ClassService.getQueryKeys().lists() });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ClassService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ClassService.getQueryKeys().lists() });
    },
  });
}

// Meeting hooks
export function useMeetings() {
  return useQuery({
    queryKey: MeetingService.getQueryKeys().lists(),
    queryFn: () => MeetingService.readAll(),
  });
}

export function useCreateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => MeetingService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingService.getQueryKeys().lists() });
    },
  });
}

export function useUpdateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => MeetingService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingService.getQueryKeys().lists() });
    },
  });
}

export function useDeleteMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => MeetingService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingService.getQueryKeys().lists() });
    },
  });
}

// Attendance hooks
export function useAttendance() {
  return useQuery({
    queryKey: AttendanceService.getQueryKeys().lists(),
    queryFn: () => AttendanceService.readAll(),
  });
}

// Grade hooks
export function useGrades() {
  return useQuery({
    queryKey: GradeService.getQueryKeys().lists(),
    queryFn: () => GradeService.readAll(),
  });
}

// File hooks
export function useFiles() {
  return useQuery({
    queryKey: FileService.getQueryKeys().lists(),
    queryFn: () => FileService.readAll(),
  });
}

export function useCreateFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => FileService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FileService.getQueryKeys().lists() });
    },
  });
}

export function useDeleteFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => FileService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FileService.getQueryKeys().lists() });
    },
  });
}