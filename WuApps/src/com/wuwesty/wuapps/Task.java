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

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class Task {

  @PrimaryKey
  @Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
  private Long id;
  
  @Persistent
  private String name;
  
  @Persistent
  private String description;

  @Persistent
  private Date due;

  @Persistent
  private int priority;

  @Persistent
  private String category;

  public Task(Long id, String name, String description, Date due, int priority, String category) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.due = due;
    this.priority = priority;
    this.category = category;
  }

  public Task(String name, String description, Date due, int priority, String category) {
    this.name = name;
    this.description = description;
    this.due = due;
    this.priority = priority;
    this.category = category;
  }

  public Long getId() {
    return id;
  }
  
  public String getName() {
    return name;
  }
  
  public String getDescription() {
    return description;
  }
  
  public Date getDue() {
	return due;
  }
  
  public int getPriority() {
	return priority;
  }
  
  public String getCategory() {
    return category;
  }
}
