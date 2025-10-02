I'm building a ai based hiring platform. at top level it works like this we offer platform as a service with job posting based pricings. here are the components a central job board for engineers. seperate dashboard for hrs to post jobs after signup and pay. an admin(me & my team) portal to view metrics. here's the general flow. a hr comes signsup, pays ans posts a job(initially for only 10 candidates, meaning he pays for only 10 candidates interview, once 10 candidates have interviewed for the role, the job posting is not availaible unless repaid, a hr can make it private themselves to avoid masses and share private link themselves), while posting job, he probvides details on job and requirements of the interview (hr aslo has the option to provide his own questions that he wants candidates to be asked) (like we want candidate to have experience in microservice architecture), it stored in our db. the candidate comes, signsup (simple one, not more information, its like open box for candidates) candidates finds a job that he wants to. clicks apply, fills basic application needs, and submits, our intermediary ai extracts relevant details from resume(max 10mb) and matches with job description, if there's over 70% match the candidate is allowed to take ai interview. the ai interview is timed, the ai analyzes the requirements, and candidates resume and generates 10 questions and asks for the candidate (the context is maintained to provide to the interviewer later. we can have context caching or context summarization of previous conversations, we should handle fault tolerance memroy management, latency) (it should be like initial greet, questions of either ai generated or from hr, then conclusion with asking candidate if there are any question.) once timer (30 mins which is variable and specified by interviewer expires or all question have been asked the interview must terminate) after terminating ai must generate insights based on candidates interview, provide 3 points on where candidate is best and where candidate can perform better and overall scoring out of 10 (for role fit) should be provided. which is shown to the interviewer(hr).

Service        Responsibilities / Jobs
Auth & User Management        - Handle HR and candidate signup/login
- Manage authentication (Cognito / JWT)
- Handle role-based access control (HR, Candidate, Admin)
- Password reset, profile updates

HR Service        
- Allow HR to post jobs
- Manage job details, candidate limits, pre-made/custom questions
- Track job status (active/inactive)
- Integrate with payment service for job activation
- Provide job metrics for HR dashboard


Candidate Service        
- Candidate job search and browsing
- Apply to jobs and upload resumes (S3)
- Track application status
- Communicate with resume processor microservice to determine eligibility
- Cache candidate-job matches for fast retrieval


Admin Dashboard        
- View platform-wide metrics: number of jobs, candidates, interviews, payments
- Access analytics (could connect to QuickSight/Redshift)
- Manage users or moderate content if needed


Payment Processing        
- Integrate with Stripe / PayPal
- Handle payment verification webhooks
- Trigger job activation or candidate limit reset
- Generate invoices / receipts for HR


Service        Responsibilities / Jobs


Resume Processor        
- Receive resumes from Candidate Service asynchronously via SQS/EventBridge
- Parse resumes using Gemini or embeddings
- Extract skills, experience, education, etc.
- Compute similarity with job description (>=70% match)
- Store parsed data / matching results in DB or cache (Redis)
- Handle retries, DLQ, and rate-limited Gemini API calls


Interview Orchestrator        
- Initialize and manage AI interview sessions
- Maintain real-time conversation context (text/audio/video) in Redis
- Manage timer per interview session (default 30 mins, configurable)
- Stream questions and receive answers via WebSocket/Socket.io
- Handle session fault tolerance (resume interrupted sessions)
- Trigger scoring service after interview completion


AI Question Generator        
- Generate AI-based questions for interviews using Gemini
- Combine with HR pre-made questions
- Provide question set to Interview Orchestrator
- Handle concurrency and API rate-limits (queue + worker model)
- Optionally cache frequently asked questions for repeated roles


Scoring & Insights Service        - Analyze candidate responses post-interview using Gemini
- Generate structured insights: 3 strengths, 3 improvement areas, overall score (0–10)
- Store results in DB for HR dashboard
- Handle retries if AI call fails
- Optional summarization of long interviews