
import { toast } from "sonner";

// Mock Firebase implementation
// In a real app, you would import and initialize Firebase here

// File interface
export interface FileItem {
  id: string;
  name: string;
  type: 'labs' | 'body' | 'imaging' | 'other';
  fileType: 'pdf' | 'image' | 'doc' | 'spreadsheet' | 'other';
  size: number;
  uploadedAt: Date;
  url: string;
  thumbnailUrl?: string;
}

// Demo files data
const demoFiles: FileItem[] = [
  {
    id: '1',
    name: 'Blood Test Results.pdf',
    type: 'labs',
    fileType: 'pdf',
    size: 1240000,
    uploadedAt: new Date(2023, 11, 22),
    url: '#',
  },
  {
    id: '2',
    name: 'MRI Scan.png',
    type: 'imaging',
    fileType: 'image',
    size: 4560000,
    uploadedAt: new Date(2023, 10, 15),
    url: '#',
    thumbnailUrl: 'https://placehold.co/400x300/e0e7ff/818cf8'
  },
  {
    id: '3',
    name: 'Body Composition Analysis.xlsx',
    type: 'body',
    fileType: 'spreadsheet',
    size: 890000,
    uploadedAt: new Date(2023, 9, 8),
    url: '#',
  },
  {
    id: '4',
    name: 'Diet Recommendations.docx',
    type: 'other',
    fileType: 'doc',
    size: 560000,
    uploadedAt: new Date(2023, 11, 5),
    url: '#',
  },
  {
    id: '5',
    name: 'X-Ray Results.jpg',
    type: 'imaging',
    fileType: 'image',
    size: 3400000,
    uploadedAt: new Date(2023, 8, 12),
    url: '#',
    thumbnailUrl: 'https://placehold.co/400x300/e0e7ff/818cf8'
  },
  {
    id: '6',
    name: 'Cholesterol Test.pdf',
    type: 'labs',
    fileType: 'pdf',
    size: 780000,
    uploadedAt: new Date(2023, 11, 28),
    url: '#',
  },
  {
    id: '7',
    name: 'Exercise Program.pdf',
    type: 'body',
    fileType: 'pdf',
    size: 1350000,
    uploadedAt: new Date(2023, 10, 19),
    url: '#',
  },
  {
    id: '8',
    name: 'CT Scan Results.png',
    type: 'imaging',
    fileType: 'image',
    size: 5200000,
    uploadedAt: new Date(2023, 7, 23),
    url: '#',
    thumbnailUrl: 'https://placehold.co/400x300/e0e7ff/818cf8'
  },
];

// Firebase Service Mock
export const firebaseService = {
  // Get all files
  getFiles: async (): Promise<FileItem[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...demoFiles];
  },
  
  // Upload file(s)
  uploadFiles: async (files: File[]): Promise<FileItem[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newFiles: FileItem[] = files.map((file, index) => {
      // Determine file type
      let fileType: FileItem['fileType'] = 'other';
      if (file.name.endsWith('.pdf')) fileType = 'pdf';
      else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => file.name.toLowerCase().endsWith(ext))) fileType = 'image';
      else if (['doc', 'docx'].some(ext => file.name.toLowerCase().endsWith(ext))) fileType = 'doc';
      else if (['xls', 'xlsx', 'csv'].some(ext => file.name.toLowerCase().endsWith(ext))) fileType = 'spreadsheet';
      
      // Determine document type (simplified logic for demo)
      let type: FileItem['type'] = 'other';
      const nameLower = file.name.toLowerCase();
      if (nameLower.includes('blood') || nameLower.includes('test') || nameLower.includes('lab')) type = 'labs';
      else if (nameLower.includes('mri') || nameLower.includes('scan') || nameLower.includes('xray') || nameLower.includes('x-ray')) type = 'imaging';
      else if (nameLower.includes('body') || nameLower.includes('composition') || nameLower.includes('weight')) type = 'body';
      
      return {
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type,
        fileType,
        size: file.size,
        uploadedAt: new Date(),
        url: '#',
        thumbnailUrl: fileType === 'image' ? URL.createObjectURL(file) : undefined
      };
    });
    
    toast.success(`${files.length} file${files.length === 1 ? '' : 's'} uploaded successfully`);
    return newFiles;
  },
  
  // Delete file
  deleteFile: async (fileId: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, you would delete from Firebase here
    toast.success("File deleted successfully");
    return true;
  }
};

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper to format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
