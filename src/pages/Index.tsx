
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FileGrid from "@/components/FileGrid";
import FileList from "@/components/FileList";
import FileViewer from "@/components/FileViewer";
import UploadModal from "@/components/UploadModal";
import DeleteDialog from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { FileItem, firebaseService } from "@/lib/firebase";
import { Upload, Filter, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // View file state
  const [viewFile, setViewFile] = useState<FileItem | null>(null);
  
  // Upload state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await firebaseService.getFiles();
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    
    fetchFiles();
  }, []);
  
  // Filter files when search or category changes
  useEffect(() => {
    let result = [...files];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(file => 
        file.name.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(file => file.type === selectedCategory);
    }
    
    setFilteredFiles(result);
  }, [files, searchQuery, selectedCategory]);
  
  // Handle file upload
  const handleUpload = async (filesToUpload: File[]) => {
    setUploading(true);
    try {
      const newFiles = await firebaseService.uploadFiles(filesToUpload);
      setFiles(prev => [...newFiles, ...prev]);
      setUploadModalOpen(false);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };
  
  // Handle file delete
  const handleDeleteFile = async () => {
    if (!fileToDelete) return;
    
    setDeleting(true);
    try {
      const success = await firebaseService.deleteFile(fileToDelete.id);
      if (success) {
        setFiles(prev => prev.filter(file => file.id !== fileToDelete.id));
        setDeleteDialogOpen(false);
        setFileToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setDeleting(false);
    }
  };
  
  // Open delete dialog
  const confirmDelete = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      setFileToDelete(file);
      setDeleteDialogOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar 
        onSearchChange={setSearchQuery}
        onViewToggle={() => setIsGridView(!isGridView)}
        isGridView={isGridView}
      />
      
      <main className="flex-1 container py-6 px-4 md:px-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Documents</h2>
            <p className="text-muted-foreground">
              Manage your medical records and health documents
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-end md:self-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 gap-1"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              onClick={() => setUploadModalOpen(true)}
              className="h-9 gap-1"
            >
              <Plus className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
            <TabsTrigger value="body">Body Composition</TabsTrigger>
            <TabsTrigger value="imaging">Medical Imaging</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mt-2">
          {isGridView ? (
            <FileGrid 
              files={filteredFiles} 
              onFileView={setViewFile}
              onFileDelete={confirmDelete}
            />
          ) : (
            <FileList 
              files={filteredFiles} 
              onFileView={setViewFile}
              onFileDelete={confirmDelete}
            />
          )}
        </div>
      </main>
      
      {/* Upload Modal */}
      <UploadModal 
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
        uploading={uploading}
      />
      
      {/* File Viewer */}
      <FileViewer 
        file={viewFile}
        open={!!viewFile}
        onClose={() => setViewFile(null)}
        onDelete={confirmDelete}
      />
      
      {/* Delete Confirmation */}
      <DeleteDialog 
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={handleDeleteFile}
        fileName={fileToDelete?.name || ""}
        deleting={deleting}
      />
      
      {/* Mobile Upload Button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <Button 
          onClick={() => setUploadModalOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <Upload className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
