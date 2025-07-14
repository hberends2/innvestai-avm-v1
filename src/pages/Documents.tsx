import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Bell, ChevronDown, ChevronRight, Grid, LayoutGrid, Plus, Search, X, Folder, Edit2, Trash2, Upload } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";

interface NavItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ onClick, icon, children, active }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn("flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg w-full text-left", active && "bg-gray-100")}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function FolderItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <span>{children}</span>
    </button>
  );
}

function FileCard({
  title,
  metadata,
  thumbnail,
  starredFiles,
  toggleStarred,
}: {
  title: string;
  metadata: string;
  thumbnail: string;
  starredFiles: Set<string>;
  toggleStarred: (fileName: string) => void;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{metadata}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleStarred(title);
            }}
            className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {starredFiles.has(title) ? (
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const Documents = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: string; name: string; size: number; type: string }>>(
    [],
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Array<{ id: string; name: string; size: number; type: string }>>([]);
  const [customFolders, setCustomFolders] = useState<Array<{ id: string; name: string }>>([]);
  const [folderName, setFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState<{ id: string; name: string } | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<{ id: string; name: string } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [starredFiles, setStarredFiles] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"recent" | "starred" | "shared">("recent");

  const allFiles = [
    { name: "Q4 Sales Deck", metadata: "Shared folder • 8 presentations", thumbnail: "/placeholder.svg" },
    { name: "Product Videos", metadata: "Shared folder • 5 videos", thumbnail: "/placeholder.svg" },
    { name: "ROI Calculator", metadata: "Shared file • 1 Excel", thumbnail: "/placeholder.svg" },
  ];

  const filteredFiles = activeTab === "starred" ? allFiles.filter((file) => starredFiles.has(file.name)) : allFiles;

  const handleItemClick = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setPendingFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleUploadConfirm = () => {
    setUploadedFiles((prev) => [...prev, ...pendingFiles]);
    setPendingFiles([]);
    setIsUploadModalOpen(false);
  };

  const handleUploadCancel = () => {
    setPendingFiles([]);
    setIsUploadModalOpen(false);
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder = {
        id: Math.random().toString(36).substr(2, 9),
        name: folderName.trim(),
      };
      setCustomFolders((prev) => [...prev, newFolder]);
      setFolderName("");
      setIsCreateFolderModalOpen(false);
    }
  };

  const handleCreateFolderCancel = () => {
    setFolderName("");
    setIsCreateFolderModalOpen(false);
  };

  const handleEditFolder = (folder: { id: string; name: string }) => {
    setEditingFolder(folder);
    setFolderName(folder.name);
    setIsEditFolderModalOpen(true);
  };

  const handleEditFolderConfirm = () => {
    if (editingFolder && folderName.trim()) {
      setCustomFolders((prev) =>
        prev.map((folder) => (folder.id === editingFolder.id ? { ...folder, name: folderName.trim() } : folder)),
      );
      setEditingFolder(null);
      setFolderName("");
      setIsEditFolderModalOpen(false);
    }
  };

  const handleEditFolderCancel = () => {
    setEditingFolder(null);
    setFolderName("");
    setIsEditFolderModalOpen(false);
  };

  const handleDeleteFolder = (folder: { id: string; name: string }) => {
    setDeletingFolder(folder);
    setIsDeleteFolderModalOpen(true);
  };

  const handleDeleteFolderConfirm = () => {
    if (deletingFolder) {
      setCustomFolders((prev) => prev.filter((folder) => folder.id !== deletingFolder.id));
      setDeletingFolder(null);
      setIsDeleteFolderModalOpen(false);
    }
  };

  const handleDeleteFolderCancel = () => {
    setDeletingFolder(null);
    setIsDeleteFolderModalOpen(false);
  };

  const removePendingFile = (fileId: string) => {
    setPendingFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const toggleStarred = (fileName: string) => {
    setStarredFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileName)) {
        newSet.delete(fileName);
      } else {
        newSet.add(fileName);
      }
      return newSet;
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onItemClick={handleItemClick} activeSection="" />
        <div className="flex-1">
          <header className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="w-96">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search files..." className="pl-9" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <Grid className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg"
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative group">
                <Button className="gap-2" disabled>
                  <Plus className="h-4 w-4" />
                  Create
                </Button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Coming soon
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsUploadModalOpen(true)}>
                <Upload className="h-4 w-4" />
                Upload
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsCreateFolderModalOpen(true)}>
                <Folder className="h-4 w-4" />
                Create folder
              </Button>
            </div>

            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "recent" | "starred" | "shared")}>
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredFiles.map((file) => (
                  <FileCard
                    key={file.name}
                    title={file.name}
                    metadata={file.metadata}
                    thumbnail={file.thumbnail}
                    starredFiles={starredFiles}
                    toggleStarred={toggleStarred}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-700">
                  <div className="col-span-1"></div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Modified</div>
                  <div className="col-span-2">Size</div>
                </div>
                <div className="divide-y">
                  {filteredFiles.map((file) => (
                    <div key={file.name} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="col-span-1 flex items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStarred(file.name);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {starredFiles.has(file.name) ? (
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="col-span-5 flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded flex items-center justify-center ${
                            file.name === "Q4 Sales Deck"
                              ? "bg-blue-100"
                              : file.name === "Product Videos"
                                ? "bg-purple-100"
                                : "bg-green-100"
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 ${
                              file.name === "Q4 Sales Deck"
                                ? "text-blue-600"
                                : file.name === "Product Videos"
                                  ? "text-purple-600"
                                  : "text-green-600"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {file.name === "Product Videos" ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            ) : file.name === "ROI Calculator" ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17V7m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            )}
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">{file.name}</span>
                      </div>
                      <div className="col-span-2 flex items-center text-sm text-gray-500">
                        {file.name === "ROI Calculator" ? "Excel" : "Folder"}
                      </div>
                      <div className="col-span-2 flex items-center text-sm text-gray-500">
                        {file.name === "Q4 Sales Deck"
                          ? "2 days ago"
                          : file.name === "Product Videos"
                            ? "1 week ago"
                            : "3 days ago"}
                      </div>
                      <div className="col-span-2 flex items-center text-sm text-gray-500">
                        {file.name === "Q4 Sales Deck"
                          ? "8 items"
                          : file.name === "Product Videos"
                            ? "5 items"
                            : "2.4 MB"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredFiles.length === 0 && activeTab === "starred" && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No starred files</h3>
                <p className="mt-1 text-sm text-gray-500">Star files to see them here.</p>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recently Uploaded</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Uploaded</span>
                        <button
                          onClick={() => setUploadedFiles((prev) => prev.filter((f) => f.id !== file.id))}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-900">Drop files here</p>
                  <p className="text-sm text-gray-500 mt-1">or</p>
                  <div className="mt-2">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="file-upload-modal"
                    />
                    <label
                      htmlFor="file-upload-modal"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Choose files
                    </label>
                  </div>
                </div>
              </div>

              {pendingFiles.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <h4 className="text-sm font-medium text-gray-900">Selected Files:</h4>
                  {pendingFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button onClick={() => removePendingFile(file.id)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleUploadCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUploadConfirm}
                  disabled={pendingFiles.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Upload {pendingFiles.length > 0 && `(${pendingFiles.length})`}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Folder Modal */}
        <Dialog open={isCreateFolderModalOpen} onOpenChange={setIsCreateFolderModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="folder-name" className="text-sm font-medium text-gray-900">
                  Folder Name
                </label>
                <Input
                  id="folder-name"
                  type="text"
                  placeholder="Enter folder name..."
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && folderName.trim()) {
                      handleCreateFolder();
                    }
                  }}
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleCreateFolderCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateFolder}
                  disabled={!folderName.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Folder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Folder Modal */}
        <Dialog open={isEditFolderModalOpen} onOpenChange={setIsEditFolderModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="edit-folder-name" className="text-sm font-medium text-gray-900">
                  Folder Name
                </label>
                <Input
                  id="edit-folder-name"
                  type="text"
                  placeholder="Enter folder name..."
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && folderName.trim()) {
                      handleEditFolderConfirm();
                    }
                  }}
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleEditFolderCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleEditFolderConfirm}
                  disabled={!folderName.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Folder Modal */}
        <Dialog open={isDeleteFolderModalOpen} onOpenChange={setIsDeleteFolderModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete the folder "{deletingFolder?.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleDeleteFolderCancel}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteFolderConfirm} className="bg-red-600 hover:bg-red-700">
                  Delete Folder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};

export default Documents;