import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listItem } from "../../actions/itemActions";
import CardScreen from "../HomeComponent/CardScreen";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { ratings } from "../../utils";
import Rating from "../ItemsComponent/Rating";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    rating = 0,
    availablePlace = "all",
  } = useParams();

  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, products } = itemList;

  const itemCategoryList = useSelector((state) => state.itemCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = itemCategoryList;

  const itemAvailablePlaceList = useSelector(
    (state) => state.itemAvailablePlaceList
  );
  const {
    loading: loadingAvailablePlaces,
    error: errorAvailablePlaces,
    availablePlaces,
  } = itemAvailablePlaceList;

  useEffect(() => {
    dispatch(
      listItem({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        rating,
        availablePlace: availablePlace !== "all" ? availablePlace : "",
      })
    );
  }, [category, dispatch, name, rating, availablePlace]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const filterAvailablePlace = filter.availablePlace || availablePlace;
    return `/search/category/${filterCategory}/name/${filterName}/rating/${filterRating}/availablePlace/${filterAvailablePlace}`;
  };

  function searchAvailablePlaceFunction() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputAvailablePlace");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myULAvailablePlace");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  function searchCategoryFunction() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputCategory");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myULCategory");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <span className="BGcolor-f7f7f2 lightBlack py-1">
            {products.length} results
          </span>
        )}
      </div>

      <div className="row">
        <div className="TotalAmount p-3 TextAlign-Initial">
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <>
                <details className="BS4 mb-3">
                  <summary className="p-2 BGcolor-f7f7f2 lightBlack FontWeightBold">
                    Categories
                  </summary>
                  <input
                    type="text"
                    id="myInputCategory"
                    onChange={searchCategoryFunction}
                    placeholder="Search Category"
                    title="Type in a name"
                    className="p-2 m-2 BS4"
                    style={{ border: "none" }}
                  ></input>
                  <ul
                    id="myULCategory"
                    style={{ height: "200px", overflowY: "scroll" }}
                  >
                    <li className="p-2 mb-1 mx-1 BGcolor-f7f7f2">
                      <Link
                        className={"all" === category ? "active" : ""}
                        to={getFilterUrl({ category: "all" })}
                        style={{ color: "#696969" }}
                      >
                        All
                      </Link>
                    </li>

                    {categories.map((c) => (
                      <li className="p-2 m-1 BGcolor-f7f7f2" key={c}>
                        <Link
                          className={c === category ? "active" : ""}
                          to={getFilterUrl({ category: c })}
                          style={{ color: "#696969" }}
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </>
            )}
          </div>

          <div>
            {loadingAvailablePlaces ? (
              <LoadingBox></LoadingBox>
            ) : errorAvailablePlaces ? (
              <MessageBox variant="danger">{errorAvailablePlaces}</MessageBox>
            ) : (
              <>
                <details className="BS4 mb-3">
                  <summary className="p-2 BGcolor-f7f7f2 lightBlack FontWeightBold">
                    Available Places
                  </summary>
                  <input
                    type="text"
                    id="myInputAvailablePlace"
                    onChange={searchAvailablePlaceFunction}
                    placeholder="Search Place"
                    title="Type in a name"
                    className="p-2 m-2 BS4"
                    style={{ border: "none" }}
                  ></input> 
                  <ul
                    id="myULAvailablePlace"
                    style={{ height: "200px", overflowY: "scroll" }}
                  >
                    <li className="p-2 mb-1 mx-1 BGcolor-f7f7f2">
                      <Link
                        className={"all" === availablePlace ? "active" : ""}
                        to={getFilterUrl({ availablePlace: "all" })}
                        style={{ color: "#696969" }}
                      >
                        All
                      </Link>
                    </li>

                    {availablePlaces.map((c) => (
                      <li className="p-2 m-1 BGcolor-f7f7f2" key={c}>
                        <Link
                          className={c === availablePlace ? "active" : ""}
                          to={getFilterUrl({ availablePlace: c })}
                          style={{ color: "#696969" }}
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </>
            )}
          </div>

          <div className="p-2 BGcolor-f7f7f2 BS4">
            <h6 className="lightBlack FontWeightBold">Customer Review</h6>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                  >
                    <Rating caption={" & up"} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="CartAllItems">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="flexContainer alignCenterJustifyCenter">
                {products.map((product) => (
                  <CardScreen key={product._id} menu={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
