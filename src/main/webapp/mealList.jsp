<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Meal list</title>
</head>
<body>
<h2>Meal list</h2>

<p><a href="meal?action=insert">Add meal</a></p>
<table border="1">
    <thead align="center">
    <tr>
        <th width="10%">Date</th>
        <th width="10%">Description</th>
        <th width="5%">Calories</th>
        <th width="5%">Is exceed</th>
        <th width="10%" colspan=2>Action</th>
    </tr>
    </thead>
    <tbody align="center">
    <c:forEach items="${mealList}" var="meal">
        <c:choose>
            <c:when test="${meal.exceed eq 'true'}">
                <tr style="color: red">
            </c:when>
            <c:otherwise>
                <tr style="color: green">
            </c:otherwise>
        </c:choose>

        <td><c:out value="${meal.dateTime}" /></td>
        <td><c:out value="${meal.description}" /></td>
        <td><c:out value="${meal.calories}" /></td>
        <td><c:out value="${meal.exceed}" /></td>

        <td><a href="meal?action=edit&dateTime=<c:out value="${meal.dateTime}"/>">Update</a></td>
        <td><a href="meal?action=delete&dateTime=<c:out value="${meal.dateTime}"/>">Delete</a></td>

        </tr>
    </c:forEach>
    </tbody>
</table>
</body>
</html>
