
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, Trash2 } from "lucide-react";
import { FileItem, formatDate, formatFileSize } from "@/lib/firebase";
import { getFileIcon, getCategoryIcon, getCategoryColor, categoryLabels } from "@/lib/fileTypes";

interface FileViewerProps {
  file: FileItem | null;
  open: boolean;
  onClose: () => void;
  onDelete: (fileId: string) => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, open, onClose, onDelete }) => {
  const FileIcon = file ? getFileIcon(file.fileType) : null;
  const CategoryIcon = file ? getCategoryIcon(file.type) : null;
  const categoryColor = file ? getCategoryColor(file.type) : '';
  
  if (!file) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0 overflow-hidden rounded-xl animate-fade-in">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {FileIcon && <FileIcon className="h-5 w-5 text-muted-foreground" />}
              <DialogTitle className="text-xl">{file.name}</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <DialogDescription className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formatDate(file.uploadedAt)} · {formatFileSize(file.size)}
              </span>
              {CategoryIcon && (
                <span className={`inline-flex items-center gap-1 ${categoryColor} text-xs px-2 py-0.5 rounded-full`}>
                  <CategoryIcon className="h-3 w-3" />
                  <span>{categoryLabels[file.type]}</span>
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                className="h-8 gap-1"
                onClick={() => {
                  onDelete(file.id);
                  onClose();
                }}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="h-[500px] overflow-y-auto mt-4 p-6 pt-2">
          {file.fileType === 'image' && file.thumbnailUrl ? (
            <div className="flex items-center justify-center h-full">
              <img 
                src={file.thumbnailUrl} 
                alt={file.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg border">
              <div className="text-center p-8">
                <FileIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/60" />
                <h3 className="text-lg font-medium">Preview not available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Download the file to view its contents
                </p>
                <Button className="mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewer;
