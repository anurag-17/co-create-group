import { useState } from 'react';
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const YourComponent = ({handleClose}) => {
  const [email, setEmail] = useState('');
  const [isMessage, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const submitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
    setLoading(false);
    return
    console.log(email);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/enquiry/createEnquiry`,
        { email }
      );
      if (response.status === 201) {
        setLoading(false);
        setEmail("");
        setMessage("");
        toast.success("Mail sent successfully ! Please check your mail", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        setLoading(false);
        setMessage("");
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 403) {
        setMessage(error?.response?.data?.message);
      } else {
        toast.error("Failed! Please try again");
        setMessage("");
        return;
      }
    }
  };

  return (
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form
          // onSubmit={submitEmail}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_target"
          noValidate
          action="https://thecocreategroup.us21.list-manage.com/subscribe/post?u=6c603f25a9c0afd6338056f72&amp;id=9c33e76f8a&amp;f_id=00aefbe6f0"
        >
          <div id="mc_embed_signup_scroll">
            <div className="indicates-required">
            <h6 className="2xl:text-[40px] md:text-[35px] text-[28px] font-[700] xl:leading-[50px] leading-[35px] uppercase">
            email
          </h6>
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL" className="2xl:text-[16px] text-[14px] font-[500] md:leading-[26px] leading-normal py-5">Please enter your mail <span className="asterisk">*</span></label>
              <input
                type="email"
                name="EMAIL"
                className="required email custom_input"
                id="mce-EMAIL"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
            </div>
            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              {/* Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <input type="text" name="b_6c603f25a9c0afd6338056f72_9c33e76f8a" tabIndex="-1" value="" />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
              <div className="mt-4">
                <button
                  type="submit"
                  // onClick={()=>handleClose}
                  className="custom_button"
                >
                  {isLoading ? "Loading.." : "submit"}
                </button>
              </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YourComponent;
