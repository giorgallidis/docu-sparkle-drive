
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

interface FileGridProps {
  files: FileItem[];
  onFileView: (file: FileItem) => void;
  onFileDelete: (fileId: string) => void;
}

const FileGrid: React.FC<FileGridProps> = ({ files, onFileView, onFileDelete }) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1 animate-fade-in">
      {files.map((file) => {
        const FileIcon = getFileIcon(file.fileType);
        const CategoryIcon = getCategoryIcon(file.type);
        const categoryColor = getCategoryColor(file.type);
        const fileTypeColor = getFileTypeColor(file.fileType);

        return (
          <div
            key={file.id}
            className="group premium-card overflow-hidden hover:scale-[1.01] transition-all"
          >
            <div className="relative w-full aspect-[4/3] bg-muted/30 cursor-pointer border-b"
                 onClick={() => onFileView(file)}>
              {file.thumbnailUrl ? (
                <img
                  src={file.thumbnailUrl}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <FileIcon className="h-16 w-16 text-muted-foreground/60" />
                </div>
              )}
              <div className={`absolute top-2 left-2 rounded-full border ${categoryColor} py-0.5 px-2 text-xs font-medium flex items-center gap-1`}>
                <CategoryIcon className="h-3 w-3" />
                <span>{file.type}</span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex justify-between items-start">
                <div className="truncate">
                  <div className="font-medium truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(file.uploadedAt)} · {formatFileSize(file.size)}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
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
              <div className={`mt-2 inline-flex items-center ${fileTypeColor} text-xs px-2 py-0.5 rounded-full`}>
                <FileIcon className="h-3 w-3 mr-1" />
                {file.fileType.toUpperCase()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileGrid;
