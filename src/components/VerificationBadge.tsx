import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const VerificationBadge = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!user || user.isVerified) {
    return null;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmitVerification = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please select a document to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Document Uploaded",
        description: "Your verification document has been submitted for review. You'll be notified once verified.",
      });
      setIsUploading(false);
      setUploadedFile(null);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
      <AlertCircle className="h-4 w-4 text-warning" />
      <div className="flex-1">
        <p className="text-sm font-medium text-warning-foreground">
          Account Not Verified
        </p>
        <p className="text-xs text-muted-foreground">
          Upload your documents to verify your account
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="border-warning text-warning hover:bg-warning/10">
            Verify Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Verify Your Account
            </DialogTitle>
            <DialogDescription>
              Upload a government-issued ID or professional certificate to verify your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document">Upload Document</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="file:mr-2 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {uploadedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {uploadedFile.name}
                </p>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Accepted formats: PDF, JPG, PNG, DOC, DOCX</p>
              <p>Max file size: 5MB</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSubmitVerification}
              disabled={!uploadedFile || isUploading}
              className="gradient-primary"
            >
              {isUploading ? "Uploading..." : "Submit for Verification"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};