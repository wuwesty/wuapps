/* Copyright (c) 2009 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.wuwesty.wuapps;

import java.util.Date;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

public class TaskUtils {

  private static final int ENTITIES_PER_PAGE = 3;

  public static String insertNew(
      String name, String description, Date due, int priority, String category)
  {
    Task entry = new Task(name, description, due, priority, category);
    
    PersistenceManager pm = PMF.get().getPersistenceManager();
    pm.makePersistent(entry);

    System.out.println(
        "The ID of the new entry is: " + entry.getId().toString());
    
    return entry.getId().toString();
  }
  
  public static List<Task> getPage(
        Long keyOffset, int indexOffset, String lastName, String state) {
    PersistenceManager pm = PMF.get().getPersistenceManager();
    
    Query query = pm.newQuery(Task.class);
    query.declareParameters(
        "Long keyOffset, String lastNameSelected, String stateSelected");
    StringBuilder filter = new StringBuilder();
    String combine = "";
    if (keyOffset != null && !keyOffset.equals("")) {
      if (filter.length() != 0) {
        filter.append(" && ");
      }
      filter.append("id >= keyOffset");
    }
    if (lastName != null && !lastName.equals("")) {
      if (filter.length() != 0) {
        filter.append(" && ");
      }
      filter.append("personalInfo.lastName == lastNameSelected");
    }
    if (state != null && !state.equals("")) {
      if (filter.length() != 0) {
        filter.append(" && ");
      }
      filter.append("addressInfo.state == stateSelected");
    }
    System.out.println("Filter is: " + filter.toString());
    if (filter.length() > 0) {
      query.setFilter(filter.toString());
    }
    query.setRange(indexOffset, indexOffset + ENTITIES_PER_PAGE + 1);
    return (List<Task>) query.execute(keyOffset, lastName, state);
  }
}
