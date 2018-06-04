Showcase application created with the following guidelines in mind:

====================================================================================================
Project Guidelines
====================================================================================================
Create a simple web project, that provides a form to upload a file and gather some metadata for that file: Title, Description and Creation date
* The UI can be implemented in any SPA framework of your choice.
* The REST back-end will be preferably implemented based on Java/Spring Boot (+ any Spring/Java library/framework of your choice) to store data.
* No user authentication and security features are needed.
* Project can use simple in-memory DB to store data
* Files can be stored in web server file system.
* No need to implement routing or sophisticated state management in UI (e.g. FLUX)
* Project can use any quality assurance mechanisms or build tools of choice
* You may also submit with the project any design considerations, restrictions, or possible future enhancements (if applicable)
====================================================================================================

The Spring backend is already configured to work with the latest production build of the react application at the moment of writing this readme file.

Running `mvn clean spring-boot:run` is enough to get the application up and running.

====================================================================================================
Improvements
====================================================================================================
There are a few details to improve in this Spring Boot + ReactJS showcase
* The backend application has no written tests
* There FileMetadataService's implementation should be decoupled using an interface.
* There is some CORS configuration in both the backend and the frontend what weren't removed.
* The files of the backend are all in the same packet, they could be split into several packets by file purpose o by file type, it depends on the project's conventions.
* The backend hasn't defined mechanism to send error details to the clients. 
* The form to upload new files doesn't clean itself when the form is submitted.
* The alert names used in the FileManagerView should be at least constants.
* The development seeds of the frontend weren't removed before creating the production build.
====================================================================================================
