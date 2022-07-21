# Kanban: Github issues

GitHub repo issues viewer as a kanban board

## Get started

Run the application locally or visit the [demo page](http://localhost:3000).

To run locally:

```
$ cd <PROJECT_FOLDER>
$ npm ci
$ npm start
```

and then visit [localhost:3000](http://localhost:3000).

Then you can enter URL of any GitHub repo you want and get the issues list in the convenient way.

> **Note** <br>
> You can use your Personal Authorization Token in order to send requests as authenticated user.<br>
> In order to do that add it as a parameter to the address bar and refresh the page:<br>
> [localhost:3000?token=<YOUR_PERSONAL_TOKEN>](https://localhost:3000?token=<YOUR_PERSONAL_TOKEN>)

### Statuses

- **Backlog** - state of the issue is "open" and no assignee
- **In Progress** - state of the issue is "open" and there is assignee
- **Done** - state of the issue is "closed"
