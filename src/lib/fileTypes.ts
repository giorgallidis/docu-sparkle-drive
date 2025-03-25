
import { 
  FileText, 
  FileImage, 
  FileSpreadsheet, 
  FileCode, 
  File,
  Flask,
  Activity,
  Camera
} from "lucide-react";
import { FileItem } from "./firebase";

// Get icon based on file type
export const getFileIcon = (fileType: FileItem['fileType']) => {
  switch (fileType) {
    case 'pdf':
    case 'doc':
      return FileText;
    case 'image':
      return FileImage;
    case 'spreadsheet':
      return FileSpreadsheet;
    default:
      return File;
  }
};

// Get category icon
export const getCategoryIcon = (type: FileItem['type']) => {
  switch (type) {
    case 'labs':
      return Flask;
    case 'body':
      return Activity;
    case 'imaging':
      return Camera;
    default:
      return File;
  }
};

// Get color for file type
export const getFileTypeColor = (fileType: FileItem['fileType']): string => {
  switch (fileType) {
    case 'pdf':
      return 'text-red-500 bg-red-50 border-red-100';
    case 'image':
      return 'text-blue-500 bg-blue-50 border-blue-100';
    case 'doc':
      return 'text-indigo-500 bg-indigo-50 border-indigo-100';
    case 'spreadsheet':
      return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    default:
      return 'text-gray-500 bg-gray-50 border-gray-100';
  }
};

// Get color for document category
export const getCategoryColor = (type: FileItem['type']): string => {
  switch (type) {
    case 'labs':
      return 'text-blue-600 bg-blue-50 border-blue-100';
    case 'body':
      return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    case 'imaging':
      return 'text-purple-600 bg-purple-50 border-purple-100';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-100';
  }
};

// Category label mapping
export const categoryLabels: Record<FileItem['type'], string> = {
  'labs': 'Lab Results',
  'body': 'Body Composition',
  'imaging': 'Medical Imaging',
  'other': 'Other Documents'
};
