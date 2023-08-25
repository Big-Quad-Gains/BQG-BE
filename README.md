# BACK-END
- Configure APIG, CDN, and ELB to work autonomously
    - Setup REST-APIs with RDS for CRUDing user-profile data
- Setup ModelArts(MindSpore and Google BERT) for training 
  - Setup OBS and Octoparse(alongside APIG) to: connect with MyFitnessPal API & MyFoodFacts API, and parse through WebMD & Mayo Clinic
- Setup CSS to fetch and index  whatever is in the RDS and OBS (idk how to do this)
- Set up DLI: Decide on what kind of data to monitor and how to translate that data into valuable insights on trends and/or threats.
  - OBS should be storing multiple logs for DLI to work with

# Cloud Service Dashboards to Include
- ModelArts
- DLI
- OBS
- APIG(maybe?)
