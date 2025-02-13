import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "./utils/constants"
import useSendEmail from "./utils/useSendEmail";

export default function ReferAndEarn() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [referrerName, setReferrerName] = useState("")
  const [referrerEmail, setReferrerEmail] = useState("")
  const [refereeName, setRefereeName] = useState("")
  const [refereeEmail, setRefereeEmail] = useState("")
  const [category, setCategory] = useState("")
  const [formError, setFormError] = useState("")
  const [mess, setMess] = useState(false)
  const { sendEmail, error, success } = useSendEmail();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");



  const handleReferNow = () => setIsModalOpen(true)
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setReferrerName("")
    setReferrerEmail("")
    setRefereeName("")
    setRefereeEmail("")
    setFormError("")
    setCategory("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(category)
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !category) {
      setFormError("Please fill out all fields.")
      return
    }
    console.log({ referrerName, referrerEmail, refereeName, refereeEmail })
     
    try{

      const res = await axios.post(BASE_URL+"create-referral", {
        
          name: referrerName,
          friendname: refereeName,
          email: referrerEmail,
          friendemail: refereeEmail,
          category: category,


      
      })

      console.log(res);
      
      setTo(refereeEmail);
      setSubject("Referral Invitation");
      const emailText = `Hello ${refereeName},\n\nYou've been referred by ${referrerName} to join our platform.\nCategory: ${category}\n\nBest regards,\nThe Team`;

      await sendEmail(refereeEmail, subject, emailText);
      console.log(success);








    handleCloseModal()
    setMess(true);

    setTimeout(()=>{
        setMess(false)
    }, 3000)

    }
    catch(err){
      console.log(err.message);
    }




  }

















  return (
    <div className="flex flex-col min-h-screen">


      
      {/* Header */}
      <header className="bg-primary text-primary-content py-4 px-6">



        
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Refer & Earn</h1>
          <button 
            className="btn btn-outline btn-secondary"
            onClick={handleReferNow}
          >
            Refer Now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-content py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Earn Rewards by Referring Friends
            </h1>
            <p className="text-lg mb-8">
              Share your unique referral link and get rewarded when your friends sign up.
            </p>
            <button className="btn btn-secondary" onClick={handleReferNow}>
              Refer Now
            </button>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Share Your Link</h3>
                  <p className="text-base-content/70">
                    Copy your unique referral link and share it with your friends.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Your Friends Sign Up</h3>
                  <p className="text-base-content/70">
                    When your friends sign up using your link, you'll both earn rewards.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">Earn Rewards</h3>
                  <p className="text-base-content/70">
                    The more friends you refer, the more rewards you can earn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box overflow-visible">
          <h3 className="font-bold text-lg">Refer a Friend</h3>
          <p className="py-4">Fill out the form below to refer a friend and earn rewards.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="form-control flex justify-between">
                <label className="label">
                  <span className="label-text">Your Name: </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-[68%]"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                />
              </div>
              <div className="form-control flex justify-between">
                <label className="label ">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                
                  type="email"
                  className="input input-bordered w-[68%]"
                  value={referrerEmail}
                  onChange={(e) => setReferrerEmail(e.target.value)}
                />
              </div>
              <div className="form-control flex justify-between">
                <label className="label">
                  <span className="label-text">Friend's Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-[68%]"
                  value={refereeName}
                  onChange={(e) => setRefereeName(e.target.value)}
                />
              </div>
              <div className="form-control flex justify-between ">
                <label className="label">
                  <span className="label-text">Friend's Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-[68%]"
                  value={refereeEmail}
                  onChange={(e) => setRefereeEmail(e.target.value)}
                />


              </div>

              <div className="form-control flex justify-between">
  <label className="label">
    <span className="label-text">Choose Option</span>
  </label>
  <div className="flex items-center gap-4 w-full justify-center">
  
    <select className="select select-bordered md:w-[70%] w-full "
    value={category}
    onChange={(e) => setCategory(e.target.value)
    

    }
    >
      <option value="" defaultValue >
            Category
          </option>
      <option value="Technology">Technology</option>
      <option value="Marketing">Marketing</option>
      <option value="Finance">Finance</option>
      <option value="Education">Education</option>
      <option value="Trading">Trading</option>
    </select>

   
  </div>
</div>

              {formError && (
                <div className="text-error font-medium">{formError}</div>
              )}
            </div>
            
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Refer Now
              </button>
            </div>


      



          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Refer & Earn. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="link link-hover">Privacy Policy</a>
            <a href="#" className="link link-hover">Terms of Service</a>
            <a href="#" className="link link-hover">Contact Us</a>
          </div>
        </div>

       { 
        
       mess && (<div className="toast toast-center">
  
  <div className="alert alert-success">
    <span>Referral sent successfully.</span>
  </div>
</div>)

}


      </footer>
    </div>
  )
}