import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

const Privacy = () => {
 

  return (
    <>
      
      <div
                    className="w-full cursor-pointer text-justify text-white"
                    onClick={() => {}}
                  >
                    <h3>Privacy Policy</h3>

                    <p className="text-[12px] ">
                      Protecting your private information is our priority. This
                      Statement of Privacy applies to{" "}
                      <a href="https://thecocreategroup.org">
                        thecocreategroup.org
                      </a>{" "}
                      and TrAIned OSAI and governs data collection and usage.
                      For the purposes of this Privacy Policy, unless otherwise
                      noted, all references to TrAIned OSAI include
                      <a href="https://thecocreategroup.org">
                        thecocreategroup.org
                      </a>
                      , TrAIned OSAI, and any of their subsidiaries. TrAIned
                      OSAI's website is a personal informational site. By using
                      TrAIned OSAI's website, you consent to the data practices
                      described in this statement.
                    </p>

                    <h5 className="text-[13px] mt-2">
                      Collection of your Personal Information
                    </h5>

                    <p className="text-[12px]">
                      In order to better provide you with products and services
                      offered, TrAIned OSAI may collect personally identifiable
                      information, such as your:
                      
                      <ul className="text-[12px]  list-disc p-2 pl-4">
                        <li>First and Last Name</li>
                        <li>Mailing Address</li>
                        <li>E-mail Address</li>
                        <li>Phone Number</li>
                        <li>Employer</li>
                        <li>Job Title</li>
                      </ul>
                    </p>

                    <p className="text-[12px]">
                      If you purchase TrAIned OSAI's products and services, we
                      collect billing and credit card information. This
                      information is used to complete the purchase transaction.
                      TrAIned OSAI may also collect anonymous demographic
                      information, which is not unique to you, such as your:
                    </p>

                    <ul className="text-[12px]  list-disc p-2 pl-4">
                      <li>Age</li>
                      <li>Gender</li>
                      <li>Race</li>
                      <li>Religion</li>
                      <li>Political Affiliation</li>
                      <li>Household Income</li>
                    </ul>

                    <p className="text-[12px] ">
                      We do not collect any personal information about you
                      unless you voluntarily provide it to us. However, you may
                      be required to provide certain personal information to us
                      when you elect to use certain products or services. These
                      may include: (a) registering for an account; (b) entering
                      a sweepstakes or contest sponsored by us or one of our
                      partners; (c) signing up for special offers from selected
                      third parties; (d) sending us an email message; (e)
                      submitting your credit card or other payment information
                      when ordering and purchasing products and services. To
                      wit, we will use your information for, but not limited to,
                      communicating with you in relation to services and/or
                      products you have requested from us. We also may gather
                      additional personal or non-personal information in the
                      future.
                    </p>

                    <h5 className="text-[13px] mt-2">Use of your Personal Information</h5>

                    <p className="text-[12px]">
                      TrAIned OSAI collects and uses your personal information
                      to operate and deliver the services you have requested.
                      TrAIned OSAI may also use your personally identifiable
                      information to inform you of other products or services
                      available from TrAIned OSAI and its affiliates.
                    </p>

                    <h5  className="text-[13px] mt-2">Sharing Information with Third Parties</h5>

                    <p className="text-[12px]">
                      TrAIned OSAI does not sell, rent, or lease its customer
                      lists to third parties. TrAIned OSAI may, from time to
                      time, contact you on behalf of external business partners
                      about a particular offering that may be of interest to
                      you. In those cases, your unique personally identifiable
                      information (e-mail, name, address, telephone number) is
                      transferred to the third party. TrAIned OSAI may share
                      data with trusted partners to help perform statistical
                      analysis, send you email or postal mail, provide customer
                      support, or arrange for deliveries. All such third parties
                      are prohibited from using your personal information except
                      to provide these services to TrAIned OSAI, and they are
                      required to maintain the confidentiality of your
                      information. TrAIned OSAI may disclose your personal
                      information, without notice, if required to do so by law
                      or in the good faith belief that such action is necessary
                      to: (a) conform to the edicts of the law or comply with
                      legal process served on TrAIned OSAI or the site; (b)
                      protect and defend the rights or property of TrAIned OSAI;
                      and/or (c) act under exigent circumstances to protect the
                      personal safety of users of TrAIned OSAI, or the public.
                    </p>

                    <h5 className="text-[13px] mt-2">
                      Opt-Out of Disclosure of Personal Information to Third
                      Parties
                    </h5>

                    <p className="text-[12px]">
                      In connection with any personal information we may
                      disclose to a third party for a business purpose, you have
                      the right to know:
                    </p>

                    <ul className="text-[12px]  list-disc p-2 pl-4">
                      <li>
                        The categories of personal information that we disclosed
                        about you for a business purpose.
                      </li>
                    </ul>

                    <p className="text-[12px]">
                      You have the right under the California Consumer Privacy
                      Act of 2018 (CCPA) and certain other privacy and data
                      protection laws, as applicable, to opt-out of the
                      disclosure of your personal information. If you exercise
                      your right to opt-out of the disclosure of your personal
                      information, we will refrain from disclosing your personal
                      information, unless you subsequently provide express
                      authorization for the disclosure of your personal
                      information. To opt-out of the disclosure of your personal
                      information, email{" "}
                      <a href="info@thecocreategroup.org">
                        info@thecocreategroup.org
                      </a>
                      .
                    </p>

                    <h5 className="text-[13px] mt-2">Tracking User Behavior</h5>

                    <p className="text-[12px]">
                      TrAIned OSAI may keep track of the websites and pages our
                      users visit within{" "}
                      <a href="https://thecocreategroup.org">
                        thecocreategroup.org
                      </a>
                      , in order to determine what services are the most
                      popular. This data is used to deliver customized content
                      and advertising to customers whose behavior indicates that
                      they are interested in a particular subject area.
                    </p>

                    <h5 className="text-[13px] mt-2">Automatically Collected Information</h5>

                    <p className="text-[12px]">
                      Information about your computer hardware and software may
                      be automatically collected by TrAIned OSAI. This
                      information can include your IP address, browser type,
                      domain names, access times, and referring website
                      addresses. This information is used for the operation of
                      the service, to maintain the quality of the service, and
                      to provide general statistics regarding the use of the
                      TrAIned OSAI website.
                    </p>

                    <h5 className="text-[13px] mt-2">Use of Cookies</h5>

                    <p className="text-[12px]">
                      TrAIned OSAI's website may use "cookies" to help you
                      personalize your online experience. A cookie is a text
                      file that is placed on your hard disk by a web page
                      server. Cookies cannot be used to run programs or deliver
                      viruses to your computer. Cookies are uniquely assigned to
                      you and can only be read by a web server in the domain
                      that issued the cookie to you. One of the primary purposes
                      of cookies is to provide a convenience feature to save you
                      time. The purpose of a cookie is to tell the Web server
                      that you have returned to a specific page. For example, if
                      you personalize TrAIned OSAI’s pages or register with
                      TrAIned OSAI’s site or services, a cookie helps TrAIned
                      OSAI to recall your specific information on subsequent
                      visits. This simplifies the process of recording your
                      personal information, such as billing addresses, shipping
                      addresses, and so on. When you return to the same website,
                      the information you previously provided can be retrieved,
                      so you can easily use the features that you customized.
                      You have the ability to accept or decline cookies. Most
                      Web browsers automatically accept cookies, but you can
                      usually modify your browser setting to decline cookies if
                      you prefer. If you choose to decline cookies, you may not
                      be able to fully experience the interactive features of
                      the services or websites you visit.
                    </p>

                    <h5 className="text-[13px] mt-2">Links</h5>

                    <p className="text-[12px]">
                      This website contains links to other sites. Please be
                      aware that we are not responsible for the content or
                      privacy practices of such other sites. We encourage our
                      users to be aware when they leave our site and to read the
                      privacy statements of any other site that collects
                      personally identifiable information.
                    </p>

                    <h5 className="text-[13px] mt-2">Security of your Personal Information</h5>

                    <p className="text-[12px]">
                      TrAIned OSAI secures your personal information from
                      unauthorized access, use, or disclosure. TrAIned OSAI uses
                      the following methods for this purpose:
                    </p>

                    <ul className="text-[12px]  list-disc p-2 pl-4">
                      <li>SSL Protocol</li>
                    </ul>

                    <p className="text-[12px]"> 
                      When personal information (such as a credit card number)
                      is transmitted to other websites, it is protected through
                      the use of encryption, such as the Secure Sockets Layer
                      (SSL) protocol. We strive to take appropriate security
                      measures to protect against unauthorized access to or
                      alteration of your personal information. Unfortunately, no
                      data transmission over the Internet or any wireless
                      network can be guaranteed to be 100% secure. As a result,
                      while we strive to protect your personal information, you
                      acknowledge that: (a) there are security and privacy
                      limitations inherent to the Internet which are beyond our
                      control; and (b) security, integrity, and privacy of any
                      and all information and data exchanged between you and us
                      through this Site cannot be guaranteed.
                    </p>

                    <h5 className="text-[13px] mt-2">Right to Deletion</h5>

                    <p className="text-[12px]">
                      Subject to certain exceptions set out below, on receipt of
                      a verifiable request from you, we will:
                    </p>

                    <ul className="text-[12px]  list-disc p-2 pl-4">
                      <li>
                        Delete your personal information from our records; and
                      </li>
                      <li>
                        Direct any service providers to delete your personal
                        information from their records.
                      </li>
                    </ul>

                    <p className="text-[12px]">
                      *Please note that we may not be able to comply with
                      requests to delete your personal information if it is
                      necessary to:
                    </p>

                    <ul className="text-[12px]  list-disc p-2 pl-4">
                      <li>
                        Complete the transaction for which the personal
                        information was collected, fulfill the terms of a
                        written warranty or product recall conducted in
                        accordance with federal law, provide a good or service
                        requested by you, or reasonably anticipated within the
                        context of our ongoing business relationship with you,
                        or otherwise perform a contract between you and us;
                      </li>
                      <li>
                        Detect security incidents, protect against malicious,
                        deceptive, fraudulent, or illegal activity; or prosecute
                        those responsible for that activity;
                      </li>
                      <li>
                        Debug to identify and repair errors that impair existing
                        intended functionality;
                      </li>
                      <li>
                        Exercise free speech, ensure the right of another
                        consumer to exercise his or her right of free speech, or
                        exercise another right provided for by law;
                      </li>
                      <li>
                        Comply with the California Electronic Communications
                        Privacy Act;
                      </li>
                      <li>
                        Engage in public or peer-reviewed scientific,
                        historical, or statistical research in the public
                        interest that adheres to all other applicable ethics and
                        privacy laws, when our deletion of the information is
                        likely to render impossible or seriously impair the
                        achievement of such research, provided we have obtained
                        your informed consent;
                      </li>
                      <li>
                        Enable solely internal uses that are reasonably aligned
                        with your expectations based on your relationship with
                        us;
                      </li>
                      <li>Comply with an existing legal obligation; or</li>
                      <li>
                        Otherwise use your personal information, internally, in
                        a lawful manner that is compatible with the context in
                        which you provided the information.
                      </li>
                    </ul>

                    <h5 className="text-[13px] mt-2">Children Under Thirteen</h5>

                    <p className="text-[12px]">
                      TrAIned OSAI does not knowingly collect personally
                      identifiable information from children under the age of
                      thirteen. If you are under the age of thirteen, you must
                      ask your parent or guardian for permission to use this
                      website.
                    </p>

                    <h5 className="text-[13px] mt-2">
                      Opt-Out & Unsubscribe from Third-Party Communications
                    </h5>

                    <p className="text-[12px]">
                      We respect your privacy and give you an opportunity to
                      opt-out of receiving announcements of certain information.
                      Users may opt-out of receiving any or all communications
                      from third-party partners of TrAIned OSAI by contacting us
                      here:
                    </p>

                    <ul className="text-[12px]  list-disc p-2 pl-4">
                      <li>
                        Email:{" "}
                        <a href="info@thecocreategroup.org">
                          info@thecocreategroup.org
                        </a>
                      </li>
                    </ul>

                    <h5 className="text-[13px] mt-2">E-mail Communications</h5>

                    <p className="text-[12px]">
                      From time to time, TrAIned OSAI may contact you via email
                      for the purpose of providing announcements, promotional
                      offers, alerts, confirmations, surveys, and/or other
                      general communication. In order to improve our Services,
                      we may receive a notification when you open an email from
                      TrAIned OSAI or click on a link therein. If you would like
                      to stop receiving marketing or promotional communications
                      via email from TrAIned OSAI, you may opt out of such
                      communications by emailing us at{" "}
                      <a href="info@thecocreategroup.org">
                        info@thecocreategroup.org
                      </a>
                      .
                    </p>

                    <h5 className="text-[13px] mt-2">External Data Storage Sites</h5>

                    <p className="text-[12px]">
                      We may store your data on servers provided by third-party
                      hosting vendors with whom we have contracted.
                    </p>

                    <h5 className="text-[13px] mt-2">Changes to this Statement</h5>
                    <p className="text-[12px]">
                      TrAIned OSAI reserves the right to change this Privacy
                      Policy from time to time. We will notify you about
                      significant changes in the way we treat personal
                      information by sending a notice to the primary email
                      address specified in your account, by placing a prominent
                      notice on our website, and/or by updating any privacy
                      information. Your continued use of the website and/or
                      Services available after such modifications will
                      constitute your: (a) acknowledgment of the modified
                      Privacy Policy; and (b) agreement to abide and be bound by
                      that Policy.
                    </p>

                    <h5 className="text-[13px] mt-2">Contact Information</h5>
                    <p className="text-[12px]">
                      TrAIned OSAI welcomes your questions or comments regarding
                      these Terms and Statement of Privacy. If you believe that
                      TrAIned OSAI has not adhered to these Terms or this
                      Statement, please contact us at:
                    </p>
                    <p className="text-[12px]">
                      Email Address:{" "}
                      <a href="info@thecocreategroup.org">
                        info@thecocreategroup.org
                      </a>
                    </p>
                  </div>
    </>
  );
};

export default Privacy;
