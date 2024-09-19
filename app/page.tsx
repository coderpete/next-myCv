import { Suspense } from "react";
import styles from "./home.module.css";
import CvAddForm from "./components/cv-add-form";

async function CVList() {
  "use server";
  const res = await fetch(
    "http://localhost:8000/resumes",
    {
      headers: {
        Authorization: 
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZiZWI3MGE2LTM5ZmItNGNkNS05NDdmLWQwZjAyZmIwMWMwOCIsImVtYWlsIjoicGV0ZUBlbWFpbC5jb20iLCJpYXQiOjE3MjYwOTA2NjgsImV4cCI6MTcyNjE3NzA2OH0.S3nlTHX9HWRhwTKySV3CXravfRX3CETLzJmryEv0n-s",
      },
    }
  );

  type Cv = {
    resume: {
      id: string;
      accountId: string;
      jobPostingId: string;
      url: string;
    },
    jobPosting: {
      id: string;
      employerId: string;
      url: string;
    },
    employer: {
      id: string;
      name: string;
      websiteUrl?: string;
      aboutUrl?: string;
      contactUrl?: string;
      careersUrl?: string;
      glassDoorUrl?: string;
    }
  }
  let cvList = await res.json();
  console.log({cvList, cvListType: typeof cvList})
  if (typeof(cvList) === "object" && cvList.statusCode === 401) {
    cvList = [];
  }
  return (
    <div>
      <h1 className={styles.hero}>CV List</h1>
      <ul style={{ listStyle: "none" }}>
        {cvList.map((cv: Cv) => (
          <li key='cv' className="py-4 my-4">
            <ul style={{ listStyle: "inside" }}>
                <li key={cv.employer.name}>
                  <a className="underline" href={cv.employer.websiteUrl}>{cv.employer.name}</a>
                </li>
                <li key={cv.jobPosting.id}>
                  <a className="underline" href={cv.jobPosting.url} target="_blank">
                    Job Posting
                  </a>
                </li>
                <li key={cv.employer.websiteUrl}>
                  <a className="underline" href={cv.employer.websiteUrl} target="_blank">
                    Employer Website
                  </a>
                </li>
                <li key={cv.employer.aboutUrl}>
                  <a className="underline" href={cv.employer.aboutUrl} target="_blank">
                    About Employer
                  </a>
                </li>
                <li key={cv.employer.contactUrl}>
                  <a className="underline" href={cv.employer.contactUrl} target="_blank">
                  Contact
                  </a>
                </li>
                <li key={cv.employer.careersUrl}>
                  <a className="underline" href={cv.employer.careersUrl} target="_blank">
                  Careers
                  </a>
                </li>
                <li key={cv.employer.glassDoorUrl}>
                  <a className="underline" href={cv.employer.glassDoorUrl} target="_blank">
                  Glass Door
                  </a>
                </li>
                <li key={cv.resume.id}>
                  <a className="underline" href={cv.resume.url} target="_blank">
                    Resume
                  </a>
                  <div className="my-4" />
                </li>

            </ul>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default function Home() {
  return (
    <section>
      <section
        className={styles.cvSection}
      >
        <h1 className={styles.h1}>
          Add Section
        </h1>
        <CvAddForm />
        </section>
      <section
        className={styles.cvSection}
      >
        <h1 className={styles.h1}>
          CV Section
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
        <CVList />
        </Suspense>
      </section>

    </section>
  );
}
