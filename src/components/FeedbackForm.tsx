
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { storeFeedback, getCurrentUser } from '@/utils/supabaseClient';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter some feedback before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { user, error: userError } = await getCurrentUser();
      
      if (userError || !user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit feedback",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      const { error } = await storeFeedback(user.id, feedback);
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Success",
        description: "Thank you for your feedback!",
      });
      
      setFeedback('');
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Share Your Feedback</h3>
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Tell us about your experience..."
        className="min-h-[100px]"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting || !feedback.trim()}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
};

export default FeedbackForm;
