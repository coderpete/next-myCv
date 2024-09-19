import styles from "../home.module.css"

export default function CvAddForm() {
  async function submitResume(formData: FormData) {
    "use server";
    console.log({formData});
  }

  return (
    // TODO: add dropdown to select from list of existing employers
    <form
      action={submitResume}
      className="flex flex-col gap-4"
    >
      <label>
      <span>URL of the Job Posting</span>
        <span style={{color: "red"}}> * </span>
        <input
          className={styles.input}
          type="text"
          name="jobPostingUrl"
          required={true}
        />
      </label>
      <label>
        <span>URL of your resume for this Job Posting</span>
        <span style={{color: "red"}}> * </span>
        <input
          className={styles.input}
          type="text"
          name="resumeUrl"
          required={true}
        />
      </label>
      
      <div className="my-4" />

      <label>
      <span>Employer Name </span>
        <span style={{color: "red"}}> * </span>
        <input
          className={styles.input}
          type="text"
          name="employerName"
          required={true}
        />
      </label>
      <label>
        <span>Employer Website </span>
        <input
          className={styles.input}
          type="text"
          name="employerWebsite" 
        />
      </label>
      <label>
        <span>Employer&apos;s About Page </span>
        <input
          className={styles.input}
          type="text"
          name="employerWebsite" 
        />
      </label>
      <label>
        <span>Employer&apos;s Contact Page </span>
        <input
          className={styles.input}
          type="text"
          name="employerWebsite" 
        />
      </label>
      <label>
        <span>Employer&apos;s Careers Page </span>
        <input
          className={styles.input}
          type="text"
          name="employerWebsite" 
        />
      </label>
      <label>
        <span>Employer&apos;s Page on GlassDoor </span>
        <input
          className={styles.input}
          type="text"
          name="employerWebsite" 
        />
      </label>

      <div className="my-4" />
      <button
        className={styles.button}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}