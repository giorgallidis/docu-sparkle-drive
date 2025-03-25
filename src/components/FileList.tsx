
import React from "react";
import { FileItem, formatDate, formatFileSize } from "@/lib/firebase";
import { getFileIcon, getCategoryIcon, getCategoryColor, getFileTypeColor } from "@/lib/fileTypes";
import { MoreHorizontal, Trash2, Eye, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FileListProps {
  files: FileItem[];
  onFileView: (file: FileItem) => void;
  onFileDelete: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileView, onFileDelete }) => {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <div className="text-4xl mb-4">📄</div>
        <h3 className="text-xl font-medium mb-2">No documents found</h3>
        <p className="text-muted-foreground">Upload your first document to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto animate-fade-in">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 px-4 font-medium">Name</th>
            <th className="py-3 px-4 font-medium">Type</th>
            <th className="py-3 px-4 font-medium">Category</th>
            <th className="py-3 px-4 font-medium">Size</th>
            <th className="py-3 px-4 font-medium">Date</th>
            <th className="py-3 px-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            const FileIcon = getFileIcon(file.fileType);
            const CategoryIcon = getCategoryIcon(file.type);
            const categoryColor = getCategoryColor(file.type);
            const fileTypeColor = getFileTypeColor(file.fileType);

            return (
              <tr key={file.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div 
                      className="cursor-pointer mr-3 rounded-md p-1.5 bg-muted/30" 
                      onClick={() => onFileView(file)}
                    >
                      <FileIcon className="h-5 w-5" />
                    </div>
                    <div className="truncate max-w-[200px]">
                      <div className="font-medium truncate">{file.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center ${fileTypeColor} text-xs px-2 py-0.5 rounded-full`}>
                    {file.fileType.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 ${categoryColor} text-xs px-2 py-0.5 rounded-full`}>
                    <CategoryIcon className="h-3 w-3" />
                    <span>{file.type}</span>
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{formatFileSize(file.size)}</td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(file.uploadedAt)}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onFileView(file)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => onFileView(file)}
                                          className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onFileDelete(file.id)}
                          className="cursor-pointer text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
