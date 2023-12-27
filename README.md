# **SNIFF frontend**

## **Summary**
The frontend part of the **SNIFF** website. </br>
Stage - **https://stage.sniff.com.ua** 

## **Installation**
`make .env`

Run `npm install` to install the required dependencies. 

## **Available Scripts**

In the project directory, you can run:

### **`npm run start`**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### **`npm run test`**

Run tests.

### **`npm run build`**

Builds the app for production to the `build` folder. </br>

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

</br>

## **Git Flow**

---

## **Summary**

As a git flow we're using the basic pipeline:

1. Create new branch from `develop`
2. Do changes
3. Commit & Push changes to **your new branch**
4. Create a new PR with base `develop`
5. Wait for review
6. You changes successfully merged to _Develop_ 

</br>

### **Branch name pattern** 

All branches must be created in `kebab-case`.

The branch should be named with the connection to the number of the task 

- Feature branch name: **feature/SNIFF-50-{TICKET-SHORT-DESCRIPTION}**

  `feature/SNIFF-50-signing-up`


- Bug branch name: **bugfix/SNIFF-239-{TICKET-SHORT-DESCRIPTION}**

  `bugfix/SNIFF-239-add-pet-btn`

- Hotfix branch name: **hotfix/SNIFF-55-{TICKET-SHORT-DESCRIPTION}**

  `hotfix/SNIFF-55-fix-validation`


</br>


### **PR name pattern**

[{JIRA}] {TICKET-SHORT-DESCRIPTION}

> e.g. SNIFF-50 something changed

</br>

### **Documentation**
https://docs.google.com/document/d/1WifxZw5Emso5bwNOEL8yImb0G-f8lkD5rtFiZXU5cJ8/edit


