import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // Compressed hover effects
  const linkHover = {":hover":{color:"#94B4C1",transform:"translateX(3px)"}}; 
  const iconHover = {":hover":{color:"#ECEFCA",transform:"scale(1.15)"}}; 
  const bottomLinkHover = {":hover":{color:"#ECEFCA",opacity:1}};
  
  return (
    <footer style={{background:"#213448",color:"#ECEFCA",padding:"40px 20px",textAlign:"left",borderTop:"1px solid rgba(236,239,202,0.1)",marginTop:"100px",fontFamily:"system-ui,-apple-system,sans-serif",boxShadow:"0 -5px 15px rgba(0,0,0,0.1)"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"30px"}}>
        <div style={{flex:"1",minWidth:"200px",marginBottom:"20px"}}>
          <h3 style={{color:"#94B4C1",fontSize:"24px",fontWeight:"600",margin:"0 0 15px"}}>WeCode</h3>
          <p style={{lineHeight:"1.6",margin:"0",fontSize:"14px"}}>Empowering developers with curated content and practice.</p>
          <div style={{marginTop:"20px",display:"flex",gap:"15px",justifyContent:"flex-start"}}>
            {["Twitter","LinkedIn","GitHub"].map(platform => (
              <a key={platform} href="#" style={{color:"#94B4C1",fontSize:"18px",transition:"all 0.3s",display:"flex",alignItems:"center",justifyContent:"center",width:"32px",height:"32px",borderRadius:"50%",background:"rgba(148,180,193,0.1)",...iconHover}} aria-label={platform}>
                {platform === "Twitter" && <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>}
                {platform === "LinkedIn" && <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                {platform === "GitHub" && <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>}
              </a>
            ))}
          </div>
        </div>
        <div style={{flex:"1",minWidth:"200px",marginBottom:"20px"}}>
          <h4 style={{color:"#94B4C1",fontSize:"16px",fontWeight:"600",margin:"0 0 15px"}}>Quick Links</h4>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"10px 20px"}}>
            {[["Courses","#courses"],["DSA","#dsa"],["About","#about"],["DevOps","#devops"],["Tutorials","#tutorials"],["Blog","#blog"]].map(([title,link]) => (
              <a key={title} href={link} style={{color:"#ECEFCA",textDecoration:"none",fontSize:"14px",transition:"all 0.3s",padding:"4px 0",display:"flex",alignItems:"center",...linkHover}}>
                <span style={{display:"inline-block",width:"6px",height:"6px",borderRadius:"50%",background:"#547792",marginRight:"8px",transition:"all 0.3s"}}></span>
                {title}
              </a>
            ))}
          </div>
        </div>
        <div style={{flex:"1",minWidth:"220px",marginBottom:"20px"}}>
          <h4 style={{color:"#94B4C1",fontSize:"16px",fontWeight:"600",margin:"0 0 15px"}}>Contact Us</h4>
          <div style={{fontSize:"14px",lineHeight:"1.8"}}>
            {[
              [<svg key="phone" width="16" height="16" viewBox="0 0 24 24" fill="#94B4C1" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>, "tel:+1234567890", "+1 (234) 567-890"],
              [<svg key="email" width="16" height="16" viewBox="0 0 24 24" fill="#94B4C1" style={{flexShrink:0}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, "mailto:support@wecode.com", "support@wecode.com"],
              [<svg key="location" width="16" height="16" viewBox="0 0 24 24" fill="#94B4C1" style={{flexShrink:0}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, null, "San Francisco, CA"]
            ].map(([icon, href, text], idx) => (
              <p key={idx} style={{margin:"0 0 8px",display:"flex",alignItems:"center",gap:"8px"}}>
                <span style={{display:"flex",alignItems:"center",justifyContent:"center",width:"24px",height:"24px",borderRadius:"50%",background:"rgba(148,180,193,0.1)"}}>{icon}</span>
                {href ? <a href={href} style={{color:"#ECEFCA",textDecoration:"none",transition:"all 0.3s",...linkHover}}>{text}</a> : <span>{text}</span>}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{marginTop:"40px",paddingTop:"20px",borderTop:"1px solid rgba(236,239,202,0.1)"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"15px"}}>
          <p style={{margin:"0",fontSize:"13px",opacity:"0.7"}}>© {currentYear} WeCode. All rights reserved.</p>
          <div style={{display:"flex",gap:"20px"}}>
            {["Privacy Policy","Terms of Service","Sitemap"].map((item, idx) => (
              <a key={idx} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} style={{color:"#ECEFCA",textDecoration:"none",fontSize:"13px",opacity:"0.7",transition:"all 0.3s",...bottomLinkHover}}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;