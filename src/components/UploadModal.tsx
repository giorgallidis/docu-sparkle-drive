
import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Upload, FileUp, Paperclip } from "lucide-react";
import { toast } from "sonner";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => Promise<void>;
  uploading: boolean;
}

const UploadModal: React.FC<UploadModalProps> = ({ open, onClose, onUpload, uploading }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileArray]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...fileArray]);
    }
  };
  
  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }
    
    try {
      await onUpload(files);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Format file size
  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setFiles([]);
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-xl animate-fade-in">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Documents
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Upload medical documents to your secure drive
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-2">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Drag & drop files here</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Or click the button below to browse your files
            </p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Paperclip className="h-4 w-4" />
              Browse Files
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              multiple 
            />
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: PDF, DOCX, XLSX, JPG, PNG
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Selected Files ({files.length})</h4>
              <div className="max-h-[200px] overflow-y-auto border rounded-lg divide-y">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/30">
                    <div className="flex items-center space-x-3 truncate">
                      <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatSize(file.size)}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose} disabled={uploading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={files.length === 0 || uploading}>
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload {files.length > 0 ? `(${files.length})` : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
