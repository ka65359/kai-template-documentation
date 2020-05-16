## Description

#### Issue
<!-- Example: ka65359/kai-template-project#xxx -->
This change relates to issue ka65359/kai-template-project#xx


#### Deployment
- [ ] Staging - http://example.com:4001
- [ ] Dev - provide URL


#### Details
<!-- Include any necessary description of changes, verification steps,
  configuration options, and screenshots of functionality here -->
  
  
## PR Warnings
- [ ] Multiple defects fixed
- [ ] New feature not behind darkflag
- [ ] Not translated
- [ ] Large PR containing multiple separate interacting parts

  
## Developer Checklist
  - [ ] Above sections filled out
  - [ ] PR up-to-date with master
  - [ ] Connected with an existing issue (at bottom of PR)
  ---
  - [ ] Jest tests delivered with PR
  - [ ] Storybook delivered with PR
  - [ ] 1 defect per PR (or explanation included in Details section)
  - [ ] Translatable - no hard-coded strings
  - [ ] Code is documented (JSDocs are updated or generated)
  - [ ] Passes eslint/stylint
  - [ ] Verified e2e tests still passing
  ---
  - [ ] Avoid `cloneDeep`. Never use `cloneDeep` on the entire state object
  - [ ] Ensure newly created state/event listeners are added and removed in `componentWillMount()` and `componentWillUnmount()`
  - [ ] Avoid `setTimeouts`
  
  
  ## Reviewer Checklist
  - [ ] Verified developer checklist items (code is documented, tests pass, lint passes, no hard-coded strings)
  - [ ] Code reviewed (best pratices followed, tests have good coverage, logic makes sense)
  - [ ] Functionality verified on provided machine
  - [ ] All review comments addressed
  
