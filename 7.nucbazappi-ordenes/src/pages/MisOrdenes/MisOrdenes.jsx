import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import CardsMisOrdenes from '../../components/MisOrdenes/CardsMisOrdenes';

import {
  MisOrdenesBtnContainerStyled,
  MisOrdenesContainerStyled,
  MisOrdenesPatternStyled,
  MisOrdenesTitleStyled,
} from './MisOrdenesStyles';
import { clearError, fetchOrdersFail } from '../../redux/orders/ordersSlice';
import { getOrders } from '../../axios/axios-orders';

const MisOrdenes = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const { orders, error } = useSelector(state => state.orders);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!orders) {
      getOrders(dispatch, currentUser)
    }

    if (!currentUser?.token) {
      dispatch(fetchOrdersFail());
    } else {
      error && dispatch(clearError());
    }
  }, [dispatch, currentUser?.token, orders, error]);

  return (
    <>
      <MisOrdenesContainerStyled>
        <MisOrdenesTitleStyled>Mis órdenes</MisOrdenesTitleStyled>
        <CardsMisOrdenes />
        <MisOrdenesBtnContainerStyled>
          <Button onClick={() => navigate('/')}>Volver a comprar</Button>
        </MisOrdenesBtnContainerStyled>
      </MisOrdenesContainerStyled>
      <MisOrdenesPatternStyled
        src='https://res.cloudinary.com/dcatzxqqf/image/upload/v1656648434/coding/NucbaZappi/Assets/Pattern_lt5uru.png'
        alt=''
      />
    </>
  );
};

export default MisOrdenes;
