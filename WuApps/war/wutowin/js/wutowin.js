TODOLIST = (function() {
    var MILLISECONDS_TO_DAYS = 86400000;
    
    function showTaskDetails(selector, task) {
        var container = jQuery(selector),
            daysDue = task.getDaysDue();
        
        // update the relevant task details
        container.find(".task-name").html(task.name);
        container.find(".task-description").html(task.description);
        
        if (daysDue < 0) {
            container.find(".task-daysleft").html("OVERDUE BY " + Math.abs(daysDue) + " DAYS").addClass("overdue");
        }
        else {
            container.find(".task-daysleft").html(daysDue + " days").removeClass("overdue");
        } // if..else
        
        container.slideDown();
    } // showTaskDetails
    
    function populateTaskList() {
        function pad(n) {
            return n<10 ? '0'+n : n;
        }
        
        var listHtml = "",
            monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        
        // iterate through the current tasks
        for (var ii = 0; ii < currentTasks.length; ii++) {
            var dueDateHtml = 
                "<ul class='calendar right'>" + 
                    "<li class='day'>" + pad(currentTasks[ii].due.getDate()) + "</li>" +
                    "<li class='month'>" + monthNames[currentTasks[ii].due.getMonth()] + "</li>" + 
                    "<li class='year'>" + currentTasks[ii].due.getFullYear() + "</li>" + 
                "</ul>";
            
            // add the list item for the task
            listHtml += "<li id='task_" + currentTasks[ii].id + "'>" + dueDateHtml +
                "<div class='task-header'>" + currentTasks[ii].name + "</div>" + 
                "<div class='task-details'>" + 
                    currentTasks[ii].description + "<br />" +
                    "<a href='#' class='task-complete right'>COMPLETE TASK</a>&nbsp;" + 
                "</div>" +
                "</li>";
        } // for
        
        jQuery("ul#alltasklist").html(listHtml);
    } // populateTaskList

    function populateOldTaskList() {
        function pad(n) {
            return n<10 ? '0'+n : n;
        }
        
        var listHtml = "",
            monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        
        // iterate through the current tasks
        for (var ii = 0; ii < currentTasks.length; ii++) {
            var dueDateHtml = 
                "<ul class='calendar right'>" + 
                    "<li class='day'>" + pad(currentTasks[ii].due.getDate()) + "</li>" +
                    "<li class='month'>" + monthNames[currentTasks[ii].due.getMonth()] + "</li>" + 
                    "<li class='year'>" + currentTasks[ii].due.getFullYear() + "</li>" + 
                "</ul>";
            
            // add the list item for the task
            listHtml += "<li id='task_" + currentTasks[ii].id + "'>" + dueDateHtml +
                "<div class='task-header'>" + currentTasks[ii].name + "</div>" + 
                "<div class='task-details'>" + 
                    currentTasks[ii].description + "<br />" +
                    "<a href='#' class='task-delete right'>DELETE TASK</a>&nbsp;" + 
                "</div>" +
                "</li>";
        } // for
        
        jQuery("ul#oldtasklist").html(listHtml);
    } // populateOldTaskList
    
    function toggleDetailsDisplay(listItem) {
        // slide up any active task details panes
        jQuery(".task-details").slideUp();

        // if the current item is selected implement a toggle
        if (activeItem == listItem) { 
            activeItem = null;
            return; 
        }
        
        // in the current list item toggle the display of the details pane
        jQuery(listItem).find(".task-details").slideDown();
        
        // update the active item
        activeItem = listItem;
    } // toggleDetailsDisplay
    
	function populateCategoryList() {
        function pad(n) {
            return n<10 ? '0'+n
			: n;
        }
        
        var listHtml = "";

        // iterate through the current categorie
        for (var ii = 0; ii < currentCategories.length; ii++) {
            // add the list item for the category
            listHtml += "<li id='category_" + currentCategories[ii].id + "'>" + 
                "<div class='task-header'>" + currentCategories[ii].name + "</div>" + 
                "<div class='task-details'>" + 
                    currentCategories[ii].sequence + "<br />" +
                    currentCategories[ii].color + "<br />" +
                    "<a href='#' class='task-complete right'>EDIT CATEGORY</a>&nbsp;" + 
                "</div>" +
                "</li>";
        } // for
        
        jQuery("ul#categorylist").html(listHtml);
    } // populateCategoryList

    // define an array that will hold the current tasks
    var currentTasks = [],
		currentCategories = [],
        activeItem = null;
    
    // define the module
    var module = {

        /* todo task */
        
        Task: function(params) {
            params = jQuery.extend({
                id: null,
                name: "",
                description: "",
                due: null,
				priority: 2,
				category: ""
            }, params);
            
            // initialise self
            var self = {
                id: params.id,
                name: params.name,
                description: params.description,
                due: params.due ? new Date(params.due) : null,
                completed: params.completed ? params.completed : null,
				priority: params.priority,
				category: params.category,
                
                complete: function() {
                    self.completed = new Date();
                },
                
                getDaysDue: function() {
                    return Math.floor((self.due - new Date()) / MILLISECONDS_TO_DAYS);
                }
            };
            
            return self;
        },
        
        Category: function(params) {
            params = jQuery.extend({
                id: null,
                name: "",
                sequence: 0,
                color: null
            }, params);
            
            // initialise self
            var self = {
                id: params.id,
                name: params.name,
                sequence: params.description,
                color: params.color
            };
            
            return self;
        },

        /* storage module */
        
        Storage: (function() {
            // open / create a database for the application (expected size ~ 100K)
            var db = null;

            try {
                //db = openDatabase("wutowin", "1.0", "To Win Database", 100 * 1024);
                
                // check that we have the required tables created
                //db.transaction(function(transaction) {
                //    transaction.executeSql(
                //        "CREATE TABLE IF NOT EXISTS task(" + 
                //        "  name TEXT NOT NULL, " + 
                //        "  description TEXT, " + 
                //        "  due DATETIME, " + 
                //        "  completed DATETIME, " +
				//		"  priority INT, " +
				//		"  category TEXT);"
				//	);
                //});

			}
            catch(e) {
			}
			
			}
            
            function getTasks(callback, extraClauses) {
                db.transaction(function(transaction) {
                    transaction.executeSql(
                        "SELECT rowid as id, * FROM task " + (extraClauses ? extraClauses : ""),
                        [],
                        function (transaction, results) {
                            // initialise an array to hold the tasks
                            var tasks = [];
                            
                            // read each of the rows from the db, and create tasks
                            for (var ii = 0; ii < results.rows.length; ii++) {
                                tasks.push(new module.Task(results.rows.item(ii)));
                            } // for
                            
                            callback(tasks);
                        }
                    );
                });
            } // getTasks
			
            function getCategories(callback, extraClauses) {
                db.transaction(function(transaction) {
                    transaction.executeSql(
                        "SELECT rowid as id, * FROM category " + (extraClauses ? extraClauses : ""),
                        [],
                        function (transaction, results) {
                            // initialise an array to hold the tasks
                            var categories = [];
                            
                            // read each of the rows from the db, and create tasks
                            for (var ii = 0; ii < results.rows.length; ii++) {
                                categories.push(new module.Category(results.rows.item(ii)));
                            } // for
                            
                            callback(categories);
                        }
                    );
                });
            } // getCategories

			function synchronizeOnline(callback) {
				db.transaction(function(transaction) {
					transaction.executeSql(
						"SELECT rowid as id, * FROM task ",
						[],
						function (transaction, results) {
							var tasksSynchronized = 0;
							// initialise an array to hold the tasks
							// read each of the rows from the db, and create tasks
							for (var ii = 0; ii < results.rows.length; ii++) {
								var task = new module.Task(results.rows.item(ii)),
								taskJson = JSON.stringify(task);
								$.post("/_je/tasks", {_doc:taskJson,_docId:task.id}, function() {
									// once the post has completed, increment the counter
									tasksSynchronized += 1;
									// and check to see if we have finished the sync operation
									if (callback && (tasksSynchronized === results.rows.length)) {
										callback(tasksSynchronized, true);
									} // if
								});
							} // for
							// fire the callback and provide information on the number
							// of tasks that were updated
							if (callback) {
								callback(results.rows.length, false);
							} // if
						}
					);
				});
			}			

            
            var subModule = {
                getIncompleteTasks: function(callback) {
                    getTasks(callback, "WHERE completed IS NULL");
                },

                getCompleteTasks: function(callback) {
                    getTasks(callback, "WHERE completed IS NOT NULL");
                },
                
                getTasksInPriorityOrder: function(callback) {
                    subModule.getIncompleteTasks(function(tasks) {
                        callback(tasks.sort(function(taskA, taskB) {
                            return taskA.due - taskB.due;
                        }));
                    });
                },

                getTasksInChronologicalOrder: function(callback) {
                    subModule.getCompleteTasks(function(tasks) {
                        callback(tasks.sort(function(taskA, taskB) {
                            return taskB.due - taskA.due;
                        }));
                    });
                },
                
                getMostImportantTask: function(callback) {
                    subModule.getTasksInPriorityOrder(function(tasks) {
                        callback(tasks.length > 0 ? tasks[0] : null);
                    });
                },
                
				synchronizeTasks: synchronizeOnline,
				
                saveTask: function(task, callback) {
                    db.transaction(function(transaction) {
                        // if the task id is not assigned, then insert
                        if (! task.id) {
                            transaction.executeSql(
                                "INSERT INTO task(name, description, due) VALUES (?, ?, ?);", 
                                [task.name, task.description, task.due],
                                function(tx) {
                                    transaction.executeSql(
                                        "SELECT MAX(rowid) AS id from task",
                                        [],
                                        function (tx, results) {
                                            task.id = results.rows.item(0).id;
                                            if (callback) {
                                                callback();
                                            } // if
                                        } 
                                    );
                                }
                            );
                        }
                        // otherwise, update
                        else {
                            transaction.executeSql(
                                "UPDATE task " +
                                "SET name = ?, description = ?, due = ?, completed = ? " + 
                                "WHERE rowid = ?;",
                                [task.name, task.description, task.due, task.completed, task.id],
                                function (tx) {
                                    if (callback) {
                                        callback();
                                    } // if
                                }
                            );
                        } // if..else
                    });
                },

                getAllCategories: function(callback) {
                    getCategories(callback, "");
                },

                saveCategory: function(category, callback) {
                    db.transaction(function(transaction) {
                        // if the category id is not assigned, then insert
                        if (! category.id) {
                            transaction.executeSql(
                                "INSERT INTO category(name, sequence, color) VALUES (?, ?, ?);", 
                                [category.name, category.sequence, category.color],
                                function(tx) {
                                    transaction.executeSql(
                                        "SELECT MAX(rowid) AS id from category",
                                        [],
                                        function (tx, results) {
                                            category.id = results.rows.item(0).id;
                                            if (callback) {
                                                callback();
                                            } // if
                                        } 
                                    );
                                }
                            );
                        }
                        // otherwise, update
                        else {
                            transaction.executeSql(
                                "UPDATE category " +
                                "SET name = ?, sequence = ?, color = ? " + 
                                "WHERE rowid = ?;",
                                [category.name, category.sequence, category.color, category.id],
                                function (tx) {
                                    if (callback) {
                                        callback();
                                    } // if
                                }
                            );
                        } // if..else
                    });
                }
				
			};
            
            return subModule;
        })(),
        
        /* validation module */
        
        Validation: (function() {
            var errors = {};

            return {
                displayErrors: function(newErrors) {
                    // initialise variables
                    var haveErrors = false;
                    
                    // update the errors with the new errors
                    errors = newErrors;

                    // remove the invalid class for all inputs
                    $(":input.invalid").removeClass("invalid");

                    // iterate through the fields specified in the errors array
                    for (var fieldName in errors) {
                        haveErrors = true;
                        $("input[name='" + fieldName + "']").addClass("invalid");
                    } // for

                    // if we have errors, then add a message to the errors div
                    $("#errors")
                        .html(haveErrors ? "Errors were found." : "")
                        .css("display", haveErrors ? "block" : "none");
                },
                
                displayFieldErrors: function(field) {
                    var messages = errors[field.name];
                    if (messages && (messages.length > 0)) {
                        // find an existing error detail section for the field
                        var errorDetail = $("#errordetail_" + field.id).get(0);

                        // if it doesn't exist, then create it
                        if (! errorDetail) {
                            $(field).before("<ul class='errors-inline' id='errordetail_" + field.id + "'></ul>");
                            errorDetail = $("#errordetail_" + field.id).get(0);
                        } // if

                        // add the various error messages to the div
                        for (var ii = 0; ii < messages.length; ii++) {
                            $(errorDetail).html('').append("<li>" + messages[ii] + "</li>");
                        } // for
                    } // if
                } // displayFieldErrors
            };
        })(),
        
        /* view activation handlers */
        
        activateMain: function() {
            TODOLIST.Storage.getMostImportantTask(function(task) {
                if (task) {
                    // the no tasks message may be displayed, so remove it
                    jQuery("#main .notasks").remove();

                    // update the task details
                    showTaskDetails("#main .task", task);
                    
                    // attach a click handler to the complete task button
                    jQuery("#main .task-complete").unbind().click(function() {
                        jQuery("#main .task").slideUp();
                        
                        // mark the task as complete
                        task.complete();
                        
                        // save the task back to storage
                        TODOLIST.Storage.saveTask(task, module.activateMain);
                    });

					jQuery("#main .synchronize").unbind().click(function() {
						TODOLIST.Storage.synchronizeTasks(function(updateCount) {
							$("#synchronizeInfo")
								.html("Completed : " + updateCount + " task(s) have been synchronized !")
								.show();
						});					
					});
					
                }
                else {
                    jQuery("#main .notasks").remove();
                    jQuery("#main .task").slideUp().after("<p class='notasks'>You have no tasks to complete</p>");
                }
            });
        },
        
        activateAllTasks: function() {
            TODOLIST.Storage.getTasksInPriorityOrder(function(tasks) {
                // update the current tasks
                currentTasks = tasks;

                populateTaskList();
                
                // refresh the task list display
                jQuery("ul#alltasklist li").click(function() {
                    toggleDetailsDisplay(this);
                });
                
                jQuery("ul#alltasklist a.task-complete").click(function() {
                    // complete the task
                    alert("complete the task");
                });
            });
        },
		
        activateOldTasks: function() {
            TODOLIST.Storage.getTasksInChronologicalOrder(function(tasks) {
                // update the current tasks
                currentTasks = tasks;

                populateOldTaskList();
                
                // refresh the task list display
                jQuery("ul#oldtasklist li").click(function() {
                    toggleDetailsDisplay(this);
                });

                jQuery("ul#oldtasklist a.task-delete").click(function() {
                    // delete the task
                    alert("Delete the task");
                });
                
            });
        },
		
        activateAllCategories: function() {
            TODOLIST.Storage.getAllCategories(function(categories) {
                // update the current tasks
                currentCategories = categories;

                populateCategoryList();
                
                // refresh the task list display
                jQuery("ul#categorylist li").click(function() {
                    toggleDetailsDisplay(this);
                });
                
                jQuery("ul#categorylist a.task-complete").click(function() {
                    // complete the task
                    alert("edit the category");
                });
            });
        },
		
    };
    
    // define the all tasks view
    PROWEBAPPS.ViewManager.define({
        id: "alltasks",
        actions: [
            new PROWEBAPPS.ChangeViewAction({
                target: "addtask",
                label: "Add"
            })
        ]
    });

    PROWEBAPPS.ViewManager.define({
        id: "categories",
        actions: [
            new PROWEBAPPS.ChangeViewAction({
                target: "addcategory",
                label: "Add"
            })
        ]
    });
    
    return module;
})();

$(document).ready(function() {
    /* validation code */

    $(":input").focus(function(evt) {
        TODOLIST.Validation.displayFieldErrors(this);
    }).blur(function(evt) {
        $("#errordetail_" + this.id).remove();
    });

    $("#taskentry").validate({
        submitHandler: function(form) {
            // get the values from the form in hashmap
            var formValues = PROWEBAPPS.getFormValues(form);
            
            // create a new task to save to the database
            var task = new TODOLIST.Task(formValues);
            
            // now create a new task
            TODOLIST.Storage.saveTask(task, function() {
                // PROWEBAPPS.ViewManager.activate("main");
                PROWEBAPPS.ViewManager.back();
            });
        },
        showErrors: function(errorMap, errorList) {
            // initialise an empty errors map
            var errors = {};

            // iterate through the jQuery validation error map, and convert to 
            // something we can use
            for (var elementName in errorMap) {
                if (! errors[elementName]) {
                    errors[elementName] = [];
                } // if

                errors[elementName].push(errorMap[elementName]);
            } // for

            // now display the errors
            TODOLIST.Validation.displayErrors(errors);
        }
    });
    
    $("#categoryentry").validate({
        submitHandler: function(form) {
            // get the values from the form in hashmap
            var formValues = PROWEBAPPS.getFormValues(form);
            
            // create a new task to save to the database
            var category = new TODOLIST.Category(formValues);
            
            // now create a new task
            TODOLIST.Storage.saveCategory(category, function() {
                // PROWEBAPPS.ViewManager.activate("main");
                PROWEBAPPS.ViewManager.back();
            });
        },
        showErrors: function(errorMap, errorList) {
            // initialise an empty errors map
            var errors = {};

            // iterate through the jQuery validation error map, and convert to 
            // something we can use
            for (var elementName in errorMap) {
                if (! errors[elementName]) {
                    errors[elementName] = [];
                } // if

                errors[elementName].push(errorMap[elementName]);
            } // for

            // now display the errors
            TODOLIST.Validation.displayErrors(errors);
        }
    });

    // bind activation handlers
    $("#main").bind("activated", TODOLIST.activateMain);
    $("#alltasks").bind("activated", TODOLIST.activateAllTasks);
    $("#oldtasks").bind("activated", TODOLIST.activateOldTasks);
    $("#categories").bind("activated", TODOLIST.activateAllCategories);

	myScroll1 = new iScroll('alltaskscroller', {desktopCompatibility:true});
	myScroll2 = new iScroll('oldtaskscroller', {desktopCompatibility:true});
	myScroll3 = new iScroll('categoryscroller', {desktopCompatibility:true});
	var wrapperH = window.innerHeight - 100;
	document.getElementById('wrapper').style.height = wrapperH;

	navigator.geolocation.getCurrentPosition(
		function storePosition(position) {
			localStorage.setItem('longitude',position.coords.longitude);
			localStorage.setItem('latitude',position.coords.latitude);
			$("#geolocation")
				.html("Your position : " + position.coords.latitude + "," + position.coords.longitude)
				.css("display","block");
	});

    // initialise the main view
    PROWEBAPPS.ViewManager.activate("main");
});